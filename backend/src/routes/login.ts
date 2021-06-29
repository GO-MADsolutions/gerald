import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import validateRequest from "../middleware/validate-request";
import BadRequestError from '../errors/bad-request-error';
import generateOtp from "../utill/generateotp";
const loginRouter = express.Router();

loginRouter.post('/api/login', 
[
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('supply password'),
],
validateRequest,
async (request: Request, response: Response) => {
  const {email, password} = request.body;
  if(email === 'test@gmail.com' && password === 'test@123') {
    generateOtp(email);
    response.status(200).send("Login successful");
  }
  else
    throw new BadRequestError("User Doesn't exists");
}

)

export default loginRouter;