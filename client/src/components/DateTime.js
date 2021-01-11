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
    <div>
      <h2>{date.toLocaleDateString()}</h2>
      <h3>{date.toLocaleTimeString()}</h3>
    </div>
  );
};
export default DateTime;
