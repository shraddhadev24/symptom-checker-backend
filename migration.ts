import axios from "axios";
import { SymptomModel } from "./schema/models/symptoms";
import convert from "xml-js";
import logger from "./config/loggerconfig";
import { DiseaseModel } from "./schema/models/disease";

export const migration = async () => {
  const sourceUrl = "http://www.orphadata.org/data/xml/en_product4.xml"
  logger.info("running Startup Script");

  const res = await axios.get(sourceUrl);

  const convertedData: any = convert.xml2js(res.data, {
    compact: true,
  });

  logger.info(`Res length ${JSON.stringify(convertedData).length}`);

  const symptomsList: any = [];
  const existingSymptoms = await SymptomModel.find({});
  const insertDataInDb =
    convertedData.JDBOR.HPODisorderSetStatusList.HPODisorderSetStatus.map(
      async (disease: any, id: number) => {
        logger.info(
          `Disease Name:-${JSON.stringify(disease.Disorder.Name._text)}`
        );

        // Insert Symptoms in master table
        const processHPOs = await Promise.all(
          disease.Disorder.HPODisorderAssociationList.HPODisorderAssociation.map(
            async (HPOData: any) => {
              logger.info(`HPO Data:--${HPOData.HPO.HPOId._text}`);
              const findExistingSymptom = symptomsList.filter(
                (symptom: any) => symptom.hpoId === HPOData.HPO.HPOId._text
              );

              if (!findExistingSymptom.length) {
                const filterExistingSymptoms =
                  existingSymptoms &&
                  existingSymptoms.filter(
                    (symptom: any) => symptom.hpoId === HPOData.HPO.HPOId._text
                  );

                if (!filterExistingSymptoms?.length) {
                  symptomsList.push({
                    hpoId: HPOData.HPO.HPOId._text,
                    hpoTerm: HPOData.HPO.HPOTerm._text,
                  });
                }
              }
              return {
                hpoId: HPOData.HPO.HPOId._text,
                hpoTerm: HPOData.HPO.HPOTerm._text,
                hpoFrequency: HPOData.HPOFrequency.Name._text,
                hpoFrequencyTerm: HPOData.HPOFrequency.Name._text
                  .split("(")[0]
                  .trim(),
              };
            }
          )
        );

        const diseaseData = {
          orphaCode: disease.Disorder.OrphaCode._text,
          diseaseName: disease.Disorder.Name._text,
          disorderType: disease.Disorder.DisorderType.Name._text,
          disorderGroup: disease.Disorder.DisorderGroup.Name._text,
          HPODisorderAssociation: processHPOs,
        };

        console.log("ProcessHPOs", processHPOs.length);
        await DiseaseModel.create(diseaseData);
        logger.info("New Disease is created");
        return null;
      }
    );

  await SymptomModel.insertMany(symptomsList);

  await Promise.all(insertDataInDb);
};
