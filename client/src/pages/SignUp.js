import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TextInput from "../components/TextInput";
import { __RegisterUser } from '../services/UserService' 


const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bootcamp, setBootcamp] = useState("");
  const [goal, setGoal] = useState("");
  const [formError, setFormError] = useState(false);

  const formFieldChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
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
      case "goal":
        setGoal(fieldValue);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formState = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      bootcamp: bootcamp,
      goal: goal,
    };
    // console.log('handleSubmit SignUp,formState:', formState)
    try {
      const accountResponse = await __RegisterUser(formState);
      // console.log('handleSubmitSignUp, accountResponse:',accountResponse)
      props.setAccount(accountResponse);
      props.history.push("/home");
    } catch (error) {
      setFormError(true);
    }
  };

  return (
    <div className="form-container">
      <form className="form-content-right" onSubmit={(e) => handleSubmit(e)}>
        <h1>Sign Up</h1>
        <div className="form-inputs">
          <label htmlFor="firstName">
            First Name
            <TextInput
              className="form-input"
              placeholder="First Name"
              name="firstName"
              type="text"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="form-inputs">
          <label htmlFor="lastName">
            Last Name
            <TextInput
              className="form-input"
              placeholder="Last Name"
              name="lastName"
              type="text"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            Email
            <TextInput
              className="form-input"
              placeholder="Email"
              name="email"
              type="text"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
            <TextInput
              className="form-input"
              placeholder="Password"
              name="password"
              type="text"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="form-inputs">
          <label htmlFor="bootcamp" className="form-label">
            Bootcamp
            <TextInput
              className="form-input"
              placeholder="Bootcamp/School"
              name="bootcamp"
              type="text"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div className="form-inputs">
          <label htmlFor="goal" className="form-label">
            End Goal
            <TextInput
              className="form-input"
              placeholder="Your End Goal"
              name="goal"
              type="text"
              onChange={formFieldChange}
            />
          </label>
        </div>
        <div>
          <button
            className="btns"
          >
            Submit
          </button>
        </div>
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
