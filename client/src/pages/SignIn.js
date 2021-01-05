import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import { __LoginUser } from '../services/UserService' 

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
      if (loginResponse !== "") {
        setAccount(loginResponse);
        props.history.push("/home");
      }
    } catch (error) {
      setFormError(true);
    }
  };

  return (
    <div className="form-container">
      <form className="form-content-right" onSubmit={(e) => handleSubmit(e)}>
        <h1>Sign In</h1>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            Email
            <TextInput
              className="form-input"
              placeholder="email"
              name="email"
              type="email"
              onChange={emailField}
            />
          </label>
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
            <TextInput
              className="form-input"
              placeholder="password"
              name="password"
              type="password"
              onChange={passwordField}
            />
          </label>
        </div>
        <div>
          <button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;