import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import { __LoginUser } from '../services/UserService' 
import '../styles/Buttons.css'
import '../styles/Form.css'


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
      // ref: Mern-Fullstack->> this.props.toggleAuthenticated(true, loginResponse.user, () => 
      // this.props.history.push('/home'))
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
      <form className="form-content form-div" onSubmit={(e) => handleSubmit(e)}>
        <h1>Sign In</h1>
        <div className="form-input">
          <label htmlFor="email" className="form-label">
            <TextInput
              className="form-input"
              placeholder="Email"
              name="email"
              type="email"
              onChange={emailField}
            />
          </label>
        </div>
        <div className="form-input">
          <label htmlFor="password" className="form-label">
            <TextInput
              className="form-input"
              placeholder="Password"
              name="password"
              type="password"
              onChange={passwordField}
            />
          </label>
        </div>
        <div className="submit-button">
          <button className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;