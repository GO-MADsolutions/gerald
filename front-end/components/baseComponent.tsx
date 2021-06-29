import React, { ReactElement, useState, useEffect} from 'react'
import Login from "./login";
import Otp from "./otp";
import Home from "./home"
interface Props {
  
}

function BaseComponent({}: Props): ReactElement {
  const [loginState, setLoginState] = useState("login");
  const [validEmail, setValidEmail] = useState("");
  useEffect(() => {
    renderLoginComponent();
  }, [loginState])
  const renderLoginComponent = () => {
    if(loginState === "login") {
      return <Login setValidEmail={setValidEmail} setLoginState={setLoginState}></Login>
    }
    else if(loginState === "otp") {
      return <Otp validEmail={validEmail} setLoginState={setLoginState}></Otp>
    }
    else {
      return <Home validEmail={validEmail}></Home>
    }
  }
  return (
    <div>
     {renderLoginComponent()}
    </div>
  )
}

export default BaseComponent
