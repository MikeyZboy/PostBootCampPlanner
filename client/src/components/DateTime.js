import React, { useState, useEffect } from "react";
import styled from 'styled-components'

const H2 = styled.h2`
  color: #ffffff;
  &:hover{
    transform: scale(1.5);
  }
`;

const H3 = styled.h3`
  color: #ffffff;
  &:hover {
    transform: scale(1.5);
  }
`;

const ClockDiv = styled.div`
  margin: 10px 10px;
`;

export const DateTime = () => {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()));

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <ClockDiv>
      <H2>{date.toLocaleDateString()}</H2>
      <H3>{date.toLocaleTimeString()}</H3>
    </ClockDiv>
  );
};
export default DateTime;
