import { model, Schema } from "mongoose";

export const diseaseSchemaa = new Schema({
  orphaCode: {
    type: Number,
    required: true,
  },
  diseaseName: {
    type: String,
    required: true,
  },
  disorderType: {
    type: String,
    required: true,
  },
  disorderGroup: {
    type: String,
    required: true,
  },
  HPODisorderAssociation: {
    type: [],
  },
});

export const DiseaseModel = model("disease", diseaseSchemaa);
