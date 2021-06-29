import React, { ReactElement, useState } from 'react';
import { useFormik } from 'formik';
import { InputLabel, FormControl, TextField, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';

interface Props {
  setLoginState: any,
  validEmail: String
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    container: {
      display: "flex",
      flexDirection: "column"
    },
    inputBox: {
      margin: 20,
      width: 300
    },
    error: {
      color: "red",
      marginLeft: 30,
      maringTop: 20
    },
    buttonStyles: {
      width: 200,
     margin: "auto"
    },
    box: {
      padding: 50,
      backgroundColor: "#fff",
      borderRadius: 4,
      color: "#444",
      background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
      boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff"
    }
  }),
);
const validateOTP = (values: any) => {
  const errors: any = {};
  if (!values.otp) {
    errors.otp = 'Enter a valid otp';
  }
  return errors;
}

function Otp({setLoginState, validEmail}: Props): ReactElement {
  const classes = useStyles();
  const [serverErrors, setServerErrors] = useState([]);
  const otpForm = useFormik({
    initialValues: {
      otp: '',
      password: ''
    },
    validate: validateOTP,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        values.email = validEmail
        await axios.post("http://localhost:4501/api/validate", values);
        setLoginState("success");
      }
      catch(error) {
        console.log("ERROR BLOCK", error.response);
        setServerErrors(error.response.data.errors)
      }
    }
  });
  const renderErrors = () => {
    return serverErrors.map((error:any) => {
      return <span className={classes.error}>{error.message}</span>
    })
  }
  return (
    <div className={classes.box}>
    <form onSubmit={otpForm.handleSubmit} className={classes.container}> 
    <FormControl >
        <TextField id="otp" name="otp" label="otp" className={classes.inputBox}
          onChange={otpForm.handleChange}
          onBlur={otpForm.handleBlur}
          value={otpForm.values.otp}
        />
        {otpForm.touched.otp}
        {otpForm.errors.otp && otpForm.touched.otp && (
          <strong className={classes.error}>
            {otpForm.errors.otp}
          </strong>
        )}
      </FormControl>
      <Button variant="contained" color="primary" type="submit" className={classes.buttonStyles}>
        Validate OTP
      </Button>
    </form>
    {serverErrors.length > 0 && renderErrors()}
    </div>
  )
}

export default Otp
