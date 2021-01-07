import React, { useState, useEffect } from "react";
import { __UpdateGoal } from "../services/AccountService";

const Goal = (props) => {
  const { setNeedsRefresh } = props;
  const [ goalValue, setGoalValue] = useState(null);

  useEffect(() => {
    if (goalValue === null) {
      setGoalValue(props.account.goal);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sentGoals = { goal: goalValue };
      const updatedGoal = await __UpdateGoal(sentGoals);
      setNeedsRefresh(true);
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setGoalValue(e.target.value);
  };

  const clearGoal = async (e) => {
    e.preventDefault();
    try {
      const updatedGoal = await __UpdateGoal({ goal: "" });
      setNeedsRefresh(true);
    } catch (error) {
      throw error;
    }
  };

  if (props.account === null || props.account === undefined) {
    return null;
  } else if (props.account.goal === null || props.account.goal === "") {
    return (
      <div className="">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className=""
            type="text"
            name="goal"
            value={goalValue}
            placeholder="What's your focus for today?"
            onChange={handleChange}
          />
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h4>Your Goal:</h4>
        <p>
        {props.account.goal}
        </p>
        <button 
        onClick={clearGoal}>
        Clear and Reset
        </button>
      </div>
    );
  }
};

export default Goal;
