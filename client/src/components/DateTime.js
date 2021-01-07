import React, { useState, useEffect } from "react";

export const DateTime = () => {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()));

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="home-grid-center-bottom">
      <h4>{date.toLocaleDateString()}</h4>
      <h4>{date.toLocaleTimeString()}</h4>
    </div>
  );
};
export default DateTime;
