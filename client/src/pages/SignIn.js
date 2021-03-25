import React, { useState, useEffect } from 'react'
import TextInput from '../components/TextInput'
import { __LoginUser } from '../services/UserService' 
import '../styles/Buttons.css'
import '../styles/Form.css'
import styled from 'styled-components'

const FormContainer = styled.div`
  height: auto;
  width: 30%;
  margin: 0 auto;
  margin-top: 2em;
  padding-top: 1em;
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
  margin-top: 20px;
  margin: 50px auto;
  position: center;
`;

const EnlargeDiv = styled.div`
  &:hover {
    transform: scale(1.1);
  }
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

const SignIn = (props) => {

  const { setAccount } = props;
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [formError, setFormError] = useState(false);

  const emailField = (e) => {
    setLoginValue(e.target.value);
  };

  const passwordField = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { email: loginValue, password: passwordValue };
      const loginResponse = await __LoginUser(userData);
      if (loginResponse !== '') {
        setAccount(loginResponse)
        props.history.push('/home')
      }
    } catch (error) {
      setFormError(true);
      throw error
    }
  };

  return (
    <FormContainer>
      <FormContent onSubmit={(e) => handleSubmit(e)}>
        <EnlargeDiv>
        <h1 className="white">Sign In</h1>
        </EnlargeDiv>
        <EnlargeDiv className="form-input">
          <label htmlFor="email" className="form-label">
            <TextInput
              placeholder="Email"
              name="email"
              type="email"
              onChange={emailField}
            />
          </label>
        </EnlargeDiv>
        <EnlargeDiv className="form-input">
          <label htmlFor="password" className="form-label">
            <TextInput
              className="form-input"
              placeholder="Password"
              name="password"
              type="password"
              onChange={passwordField}
            />
          </label>
        </EnlargeDiv>
        <EnlargeDiv>
          <SubmitButton>Submit</SubmitButton>
        </EnlargeDiv>
      </FormContent>
    </FormContainer>
  );
};

export default SignIn;