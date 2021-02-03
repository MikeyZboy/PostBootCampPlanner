import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TextInput from "../components/TextInput";
import { __RegisterUser } from '../services/UserService' 
import "../styles/Form.css"
import "../styles/Buttons.css"

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bootcamp, setBootcamp] = useState("");
  const [formError, setFormError] = useState(false);

  const formFieldChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value; 
      if (fieldValue == '' || fieldValue == null) {
        setFormError(true)
        return
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
    event.preventDefault();
// could I put formState here as a declared useState value up top for clean code?
    const formState = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      bootcamp: bootcamp
    };
    try {
      const accountResponse = await __RegisterUser(formState);
      props.setAccount(accountResponse);
      props.history.push("/home");
    } catch (error) {
      setFormError(true);
    }
  };

  return (
    <div className="form-container">
      <form className="form-content form-div" onSubmit={(e) => handleSubmit(e)}>
        <h1>Create Your Profile</h1>
        <div className="form-input">
          <label htmlFor="firstName">
            <TextInput
              className="form-input"
              type="text"
              placeholder="First Name*"
              name="firstName"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="form-input">
          <label htmlFor="lastName">
            <TextInput
              className="form-input"
              type="text"
              placeholder="Last Name*"
              name="lastName"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="form-input">
          <label htmlFor="email" className="form-label">
            <TextInput
              className="form-input"
              type="text" 
              placeholder="Email*"
              name="email"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="form-input">
          <label htmlFor="password" className="form-label">
            <TextInput
              className="form-input"
              type="text"
              placeholder="Password*"
              name="password"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="form-input">
          <label htmlFor="bootcamp" className="form-label">
            <TextInput
              className="form-input"
              type="text"
              placeholder="Bootcamp/School*"
              name="bootcamp"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="submit-button">
          <button className="submit-button">Submit</button>
        </div>
        { formError ? (
          <alert>All Fields Required</alert>  
        ) : (
          <p>Thanks for signing up!</p>
        )
        }
        <div>
          <NavLink to="/signin" activeclassName="nav-active">
            <p>Already have an account?</p>
          </NavLink>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
