import React, { useState, useEffect } from "react";
import { __GetProfile, __UpdateGoal } from "../services/AccountService";

const Goal = (props) => {
  const { account } = props;
  const [ goalValue, setGoalValue] = useState('');
  
  const fetchGoal = async () => {
    let accountData = await __GetProfile(account.id)
    setGoalValue(accountData.goal)
  }

  useEffect(() => {
    fetchGoal()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const sentGoal = { goal: goalValue };
      const updatedGoal = await __UpdateGoal(sentGoal);
      setGoalValue(updatedGoal)
      fetchGoal()
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
      setGoalValue(updatedGoal)
    } catch (error) {
      throw error;
    }
  };

    return (
      <div className="">
        { !account.goal ? 
        (
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input
            className="goal-input"
            type="text"
            name="goal"
            value={goalValue}
            placeholder="What are you focusing on these days?"
            onChange={handleChange}
          />     
        </form>
        ) : (
        <div>
          <h4>Your Goal at {props.account.bootcamp}:</h4>
          <p>
            {props.account.goal}
          </p>
          <button 
            onClick={clearGoal}>
            Clear and Reset
          </button>
        </div>
        )
      }
      </div>
    );
};

export default Goal;
