import httpStatus from "http-status";
import { Request, Response } from "express";
import * as DiagnosService from "../service/diagnos";

import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/response";

// Give Disease Predict List
export const diagnos = async (req: Request, res: Response) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms?.length) {
      res.status(httpStatus.BAD_REQUEST);
      res.send({
        success: false,
        message: ERROR_MESSAGES.SYMPOTM_MISSING,
      });
    }  else {
      const resp = await DiagnosService.getDisease(symptoms);
      res.status(httpStatus.OK).send({
        success: true,
        message: SUCCESS_MESSAGES.VALID_REQUEST,
        data: resp,
      });
    }
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST);
    res.send({
      success: false,
      message: err.message,
      data: err,
    });
  }
};
