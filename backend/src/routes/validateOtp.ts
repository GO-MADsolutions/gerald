import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import validateRequest from "../middleware/validate-request";
import BadRequestError from '../errors/bad-request-error';
import { Otp } from "../models/opt";
const validateOtpRouter = express.Router();

validateOtpRouter.post('/api/validate', 
[
  body('email').isEmail().withMessage('Email must be valid'),
  body('otp').trim().notEmpty().withMessage('supply password'),
],
validateRequest,
async (request: Request, response: Response) => {
  const {otp, email} = request.body;
   const otpResult:any = await Otp.aggregate([
    {
      $match: {
        otp,
        email
      }
    }
  ]);

  if(otpResult.length) {
    response.status(200).send("SUCCESSFUL LOGIN");
  }

  else {
    throw new BadRequestError("OTP HAS EXPIRED/ INVALID");
  }
}

)

export default validateOtpRouter;