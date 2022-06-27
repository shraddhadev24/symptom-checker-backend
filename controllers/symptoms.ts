import httpStatus from "http-status";
import { Request, Response } from "express";
import * as SymptomsService from "../service/symptoms";

import { SUCCESS_MESSAGES } from "../constants/response";

// Give List of Symptoms + Allow user to search symptoms by name + HpoIds
export const symptoms = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const resp = await SymptomsService.getSymptomsList(
      search?.toString() || ""
    );
    res.status(httpStatus.OK).send({
      success: true,
      message: SUCCESS_MESSAGES.VALID_REQUEST,
      data: resp,
    });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST);
    res.send({
      success: false,
      message: err.message,
      data: err,
    });
  }
};
