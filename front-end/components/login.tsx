import React, { ReactElement, useState } from 'react'
import { useFormik } from 'formik';
import { InputLabel, FormControl, TextField, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';

interface Props {
  setValidEmail: any,
  setLoginState: any
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
      marginLeft: 30
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
const validateLogin = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Enter a valid email';
  }

  if (!values.password) {
    errors.password = 'Enter a password';
  }
  return errors;
}

function Login({setValidEmail, setLoginState}: Props): ReactElement {
  const classes = useStyles();
  const [serverErrors, setServerErrors] = useState([]);
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: validateLogin,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:4501/api/login", values);
        setValidEmail(values.email);
        setLoginState("otp");
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
    <form onSubmit={loginForm.handleSubmit} className={classes.container}> 
    <h3>Login</h3>
      <FormControl >
        <TextField id="email" name="email" label="Email" className={classes.inputBox}
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          value={loginForm.values.email}
        />
        {loginForm.touched.email}
        {loginForm.errors.email && loginForm.touched.email && (
          <strong className={classes.error}>
            {loginForm.errors.email}
          </strong>
        )}
      </FormControl>
      <FormControl >
        <TextField className={classes.inputBox} id="password" name="password" label="Password" type="password"
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          value={loginForm.values.password}
        />
        {loginForm.touched.password}
        {loginForm.errors.password && loginForm.touched.password && (
          <strong className={classes.error}>
            {loginForm.errors.password}
          </strong>
        )}
      </FormControl>
      <Button variant="contained" color="primary" type="submit" className={classes.buttonStyles}>
        Login
      </Button>
      </form>
      {serverErrors.length > 0 && renderErrors()}
    </div>
  )
}

export default Login
