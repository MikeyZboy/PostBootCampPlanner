import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TextInput from "../components/TextInput";
import { __RegisterUser } from '../services/UserService' 
import "../styles/Form.css"
import "../styles/Buttons.css"
import styled from 'styled-components'

const FormContainer = styled.div`
  height: auto;
  width: 30%;
  margin: 0 auto;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: large;
  border: 3px solid grey;
  border-radius: 15px;
  position: relative;
  align-items: center;
  box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #194d44;
`;

const FormContent = styled.form`
  padding: 20px;
  margin-top: 5px;
  margin: 50px auto;
  position: center;
`;

const SubmitButton = styled.button`
  position: relative;
  border: 2px solid gray;
  box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 1em;
  margin: 1em;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  font-family: "Roboto Mono", monospace;
  font-weight: bolder;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const EnlargeDiv = styled.div`
  &:hover {
    transform: scale(1.1);
  }
`;

const Alert = styled.p`
  padding: 25px;
  display: block; 
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
`;

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bootcamp, setBootcamp] = useState("");
  const [formError, setFormError] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);

  const formFieldChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    if (fieldValue === "" || fieldValue === null) {
      setFormError(true);
      return;
    }
    switch (fieldName) {
      case "firstName":
        setFirstName(fieldValue);
        break;
      case "lastName":
        setLastName(fieldValue);
        break;
      case "email":
        setEmail(fieldValue);
        break;
      case "password":
        setPassword(fieldValue);
        break;
      case "bootcamp":
        setBootcamp(fieldValue);
        break;
    }
  };

  const handleSubmit = async (event) => {
    console.log("handleSubmit hit");
    event.preventDefault();
    const formState = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      bootcamp: bootcamp,
    };
    try {
      const accountResponse = await __RegisterUser(formState);
      props.setAccount(accountResponse);
      props.history.push("/home");
    } catch (error) {
      setFormError(true);
    }
  };

  // STILL IN DEVELOPMENT IF SHORT-CIRCUIT / TERNARY DOESNT WORK ("https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e/")
  // const renderAlert = () => {
  //   let alert;
  //   if (formError === true) {
  //     alert =
  //     <alert>
  //       *All Fields Required
  //     </alert>
  //   } else if (validSubmit) {
  //     alert =
  //     <alert>
  //       Thanks for signing up!
  //     </alert>
  //   }
  //   return alert
  // }

  return (
    <FormContainer>
      <FormContent onSubmit={(e) => handleSubmit(e)}>
        <EnlargeDiv>
          <h1 className="white">Create Your Profile</h1>
        </EnlargeDiv>
        <EnlargeDiv className="form-input">
          <label htmlFor="firstName">
            <TextInput
              className="form-input"
              type="text"
              placeholder="First Name*"
              name="firstName"
              onChange={formFieldChange}
            />
          </label>
        </EnlargeDiv>
        <EnlargeDiv className="form-input">
          <label htmlFor="lastName">
            <TextInput
              className="form-input"
              type="text"
              placeholder="Last Name*"
              name="lastName"
              onChange={formFieldChange}
            />
          </label>
        </EnlargeDiv>
        <EnlargeDiv className="form-input">
          <label htmlFor="email" className="form-label">
            <TextInput
              className="form-input"
              type="text"
              placeholder="Email*"
              name="email"
              onChange={formFieldChange}
            />
          </label>
        </EnlargeDiv>
        <EnlargeDiv className="form-input">
          <label htmlFor="password" className="form-label">
            <TextInput
              className="form-input"
              type="text"
              placeholder="Password*"
              name="password"
              onChange={formFieldChange}
            />
          </label>
        </EnlargeDiv>
        <EnlargeDiv className="form-input">
          <label htmlFor="bootcamp" className="form-label">
            <TextInput
              className="form-input"
              type="text"
              placeholder="Bootcamp/School*"
              name="bootcamp"
              onChange={formFieldChange}
            />
          </label>
        </EnlargeDiv>
        <div className="submit-button">
          <SubmitButton className="submit-button">Submit</SubmitButton>
        </div>
        {validSubmit && (
          <EnlargeDiv>
            <Alert>Thanks for signing up!</Alert>
          </EnlargeDiv>
        )}
        {formError ? (
          <EnlargeDiv>
            <Alert>All Fields Required</Alert>
            <NavLink to="/signin">
              <Link>Have an account?</Link>
            </NavLink>
          </EnlargeDiv>
        ) : (
          <NavLink to="/signin">
            <Link>Have an account?</Link>
          </NavLink>
        )}
      </FormContent>
    </FormContainer>
  );
};
export default SignUp;
