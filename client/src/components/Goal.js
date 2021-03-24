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

    return (
      <div>
        <p>What are you focusing on?</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="goal-input"
            type="text"
            name="goal"
            value={goalValue}
            placeholder="__________________"
            onChange={handleChange}
            contentEditable
          />
        </form>
      </div>
    );
};

export default Goal;
