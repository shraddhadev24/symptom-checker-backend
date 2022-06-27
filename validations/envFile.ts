// Need to remove this file as it is unused

import dotenv from "dotenv";
import Joi from "joi";
import path from "path";
import { ENV_VAR_UNDFINED } from "../utils/helper";

dotenv.config({ path: path.join(__dirname, "../.env") });

export const envVarsSchema = Joi.object().keys({
  NODE_ENV: Joi.string()
    .valid("production", "development", "test")
    .required()
    .label(ENV_VAR_UNDFINED("NODE_ENV")),
  PORT: Joi.number().positive().required().label(ENV_VAR_UNDFINED("PORT")),
  MONGO_CONNECTING_STRING: Joi.string()
    .required()
    .label(ENV_VAR_UNDFINED("MONGO_CONNECTING_STRING")),
});
