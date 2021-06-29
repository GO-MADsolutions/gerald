import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import loginRouter from "./routes/login";
import validateOtpRouter from "./routes/validateOtp";
import errorHandler from "./errors/error-handler";
import mongoose from 'mongoose';
import startCron from "./utill/cronjob";
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(loginRouter);
app.use(validateOtpRouter);
app.use(errorHandler);
const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://root:test@cluster0.7pymi.mongodb.net/timelinetrackr?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log('Connected to mongodb');
    mongoose.set('debug', true);
  } catch (e) {
    console.error(e);
  }
  app.listen(4501, () => {
    console.log("SERVER STARTED");
    startCron();
  });
};

start();