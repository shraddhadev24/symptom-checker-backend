export const SERVER_TIMEOUT: number = 360000;
export const SERVER_PARAMETER_LIMIT: number = 50000;
export const SERVER_FILE_LIMIT: string = "50mb";
export const SERVER_ALLOWED_METHODS: string = "GET,HEAD,PUT,PATCH,POST,DELETE";
export const SERVER_EXPOSED_HEADERS: string[] = ["sessionid"];

export const PORT_TEXT: string = "port";

export enum ALLOWED_ENV {
  local = "local",
  production = "production",
}

export const PREDICT_DISEASE_LIMIT = 5;
export const LOG_DIR: string = "logs";
