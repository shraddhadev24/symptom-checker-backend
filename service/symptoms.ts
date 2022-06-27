import { SymptomModel } from "../schema/models";

export const getSymptomsList = async (search: string) => {
  const regex = {
    $regex: search,
    $options: "i",
  };

  // Fetching Symptoms 15 at a time 
  const symptomData = await SymptomModel.find({
    $or: [{ hpoId: regex }, { hpoTerm: regex }],
  }).limit(15);
  return symptomData;
};
