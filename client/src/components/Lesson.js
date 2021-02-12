import React from 'react'
import { __DeleteLesson, __UpdateLesson, __GetLessons } from "../services/LessonService"
import styled from 'styled-components'

const Favicon = styled.img`
    size: 16px;
    min-height: 12px;
    min-width: 12px;
    max-height: 24px;
    max-width: 24px;
    padding: 1px 5px 1px 2px;
`;

const Lesson = (props) => {  

    return (
      <div>
        <a href={props.lesson.link}>
          <Favicon
            src={`https://icons.duckduckgo.com/ip2/${props.lesson.link}.ico`}
          />
          {props.lesson.title}
        </a>
      </div>
    );
}

export default Lesson