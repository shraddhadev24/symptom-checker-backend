import _ from "lodash";
import { DiseaseModel } from "../schema/models";
import { PREDICT_DISEASE_LIMIT } from "../constants/app";

export const getDisease = async (symptoms: string[]): Promise<any> => {
  const diseaseData = await DiseaseModel.find({
    "HPODisorderAssociation.hpoId": { $all: [...symptoms] },
  });

  // Find Relevant Disease
  return orderDiseaseData(diseaseData, symptoms);
};

const orderDiseaseData = async (diseaseData: any[], symptoms: string[]) => {
  // 1. Sort array having Disease as high priority
  // 2. Return top 5 diease
  const priorityFrequency: {
    [key: string]: number;
  } = {
    "Very frequent": 1,
    Frequent: 2,
    Occasional: 3,
    "Very rare": 4,
  };


  let orderedData = await Promise.all(
    diseaseData.map((disease) => {
      let priority = 0;
      disease.HPODisorderAssociation.filter(
        (symptom: any) => {
          if (symptoms.includes(symptom.hpoId)) {
            const frequencyTerm = symptom.hpoFrequencyTerm as string;
            priority += priorityFrequency[frequencyTerm] ?? 0;

            return true;
          }

          return false;
        }
      );
      return {
        ...disease._doc,
        name: disease.diseaseName,
        priority,
      };
    })
  );

  orderedData = _.sortBy(orderedData, "priority");

  if (orderedData?.length > PREDICT_DISEASE_LIMIT) {
    orderedData.length = PREDICT_DISEASE_LIMIT;
  }

  return orderedData;
};
