/* Since we don't have @types/otp-generato we are using require*/
const otpGenerator = require('otp-generator');
import {Otp} from "../models/opt";
import BadRequestError from '../errors/bad-request-error';
const generateOtp = async (email:string) => {
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false , digits:true, alphabets:false});
  console.log("LOGIN OTP ===>", otp);
  const otpDetails = Otp.build(
    {
      otp,
      email,
      createdAt: new Date(),
      expired: false
    }
  )
  try {
    await otpDetails.save();
  }
  catch(e) {
    throw new BadRequestError("Error Generating in OTP");
  }
}

export default generateOtp;