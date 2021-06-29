import cron from "node-cron";
import { Otp } from "../models/opt";

const startCron = async () => {
  cron.schedule('* * * * *', async () => {
    console.log("CAME HERE");
    try {
      const pendingOtps: Array<any> = await Otp.aggregate([
        {
          $match: {
            expired: false
          }
        }
      ]);
      if(pendingOtps.length) {
        console.log("VALID OTPS", pendingOtps.length);
        pendingOtps.forEach((optDetails:any) => {
          const differnce = Math.abs(new Date().getTime() - new Date(optDetails.createdAt).getTime());
          console.log("DIFFERENCE ", differnce);
          if((differnce / (1000 * 60) % 60) > 1) {
            console.log("INVALIDING OTP", optDetails);
            try {
              const _id  = optDetails._id
              Otp.findByIdAndRemove({_id}).then(()=> console.log("DELETED"))
              
            }catch(e) {
              console.log("OTP DELETION ERROR", e);
            }
           
          }
        })
      }
    } catch (e) {
      console.log("error", e)
    }
  });
}
export default startCron;
