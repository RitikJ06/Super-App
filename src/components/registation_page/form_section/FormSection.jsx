import React from 'react'
import './FormSection.css'
import HeadingImg from '../../images/Super_App_Heading.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FormSection() {
  let [formValues, setFormValues] = useState({
    name : "",
    username : "",
    email : "",
    mobile : "",
    consent : false
  });

  let newFormValues = {...formValues};

  const [nameError, setNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [consentCheckError, SetConsentCheckError] = useState("");

  const navigate = useNavigate();

  const handleInput = (event) => {
    // temporary variable is created to overcome the asyc behaviour of useState
    event.target.name == "consent" ?
    newFormValues = {...formValues, [event.target.name]: event.target.checked}:
      newFormValues = {...formValues, [event.target.name]: event.target.value}
    setFormValues(newFormValues);
    
    if(event.target.name == "name"){
      validateName();
    }
    else if(event.target.name == "username"){
      validateUserName();
    }
    else if(event.target.name == "email"){
      validateEmail();
    }
    else if(event.target.name == "mobile"){
      validateMobile();
    }
    else if(event.target.name == "consent"){
      validateConsent();
    }
  };

  const validateName = () =>{
    if(!newFormValues.name.trim()){
      setNameError("Please enter a valid name");
      return false;
    }
    else{
      setNameError("");
      return true;
    }
  }
  
  const validateUserName = () => {
    if(!newFormValues.username.trim()){
      setUserNameError("Please enter a valid username");
      return false;
    }
    else{
      setUserNameError("");
      return true;
    }
  }
  
  const validateEmail = () => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!newFormValues.email.trim().match(emailRegex)){
      setEmailError("Please enter a valid email");
      return false;
    }
    else{
      setEmailError("");
      return true;
    }
  }

  const validateMobile = () => {
    if(newFormValues.mobile.trim().length != 10){
      setMobileError("Please enter a valid mobile number");
      return false;
    }
    else{
      setMobileError("");
      return true;
    }
  }

  const validateConsent = () => {
    if(newFormValues.consent == false){
      SetConsentCheckError("Agree to above statement to continue");
      return false;
    }
    else{
      SetConsentCheckError("");
      return true;
    }

  }

  const validateAndShowErrors = () => {
    let nameValid = validateName();
    let usernameValid = validateUserName();
    let emailValid = validateEmail();
    let mobileValid = validateMobile();
    let consentValid = validateConsent();
    if(nameValid && usernameValid && emailValid && mobileValid && consentValid){
      // store data in local storage
      localStorage.setItem("userData", JSON.stringify(newFormValues));
      navigate('/choose-category');
    }
  }

  return (
    <section className='FormSection'>
      <div className='SuperAppHeadingDiv'>
        <img src={HeadingImg}/>
        <p>Create your new account</p>
        <div className='EmailGoogleSignup'>
          <span className='EmailSignup'>Email</span>
          <span>Google</span>
        </div>
      </div>
      <div className='form'>
        <div className='InputFields'>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInput}
            placeholder="Name"
          />
          <div className='errorMessage'>{nameError}</div>
          <input
            type="text"
            name="username"
            value={formValues.userName}
            onChange={handleInput}
            placeholder="Username"
          />
          <div className='errorMessage'>{userNameError}</div>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInput}
            placeholder="Email"
          />
          <div className='errorMessage'>{emailError}</div>
          <input
            type="number"
            name="mobile"
            value={formValues.mobile}
            onChange={handleInput}
            placeholder="Mobile"
          />
          <div className='errorMessage'>{mobileError}</div>
          <div>
            <div className='ConsentCheck'>
              <input className='CheckBoxTick' name='consent' type='checkbox' defaultChecked={false} onChange={handleInput}/>
              Share my registration data with Superapp
            </div>
          </div>
          <div className='errorMessage'>{consentCheckError}</div>

        </div>

        <button type="submit" className="SignUpButton" onClick={validateAndShowErrors}>SIGN UP</button>
        <div className='TandCText'>
          <p> 
            By clicking on Sign up. you agree to Superapp <a>Terms and Conditions of Use</a>
          </p>
          <p>
          To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <a>Privacy Policy</a>
          </p>
        </div>
      </div>

    </section>
  )
}
