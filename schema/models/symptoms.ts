import { Document, model, Schema } from "mongoose";

export interface Symptoms extends Document {
  hpoTerm: string;
  hpoId: string;
}

export const symptoms = new Schema({
  hpoTerm: {
    type: String,
    required: true,
  },
  hpoId: {
    type: String,
    required: true,
  },
});

export const SymptomModel = model<Symptoms>("symptoms", symptoms);
