import mongoose from 'mongoose';

interface otpAttr {
  email: string;
  otp: string;
  createdAt: Date;
  expired: Boolean;
}

interface OtpDoc extends mongoose.Document {
  email: string;
  otp: string;
  createdAt: Date;
  expired: Boolean;
}

interface OtpModel extends mongoose.Model<any> {
  build(attrs: otpAttr): OtpDoc;
}

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true
    },
    expired: {
      type: Boolean,
      required: true
    }

  },
  {
    /*toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    }*/
  }
);

otpSchema.statics.build = (attrs: otpAttr) => new Otp(attrs);

const Otp = mongoose.model<OtpDoc, OtpModel>('Otp', otpSchema);
export { Otp };