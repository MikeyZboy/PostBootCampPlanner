import React, { useState, useEffect } from 'react'
import Lesson from './Lesson'
import {
  __DeleteLesson,
  __GetLessons,
  __UpdateLesson,
} from "../services/LessonService";
import styled from 'styled-components'

const LessonCard = styled.div`
  position: relative;
  padding: 1em;
  border: 2px solid gray;
  border-radius: 15px 30px;
  margin: 1em;
  margin-top: 25em;
`;

const LessonList = (props) => {
    const [lessons, setLessons] = useState([])

    const getLessons = async () => {
      let userLessons = await __GetLessons(props.account.id);
      setLessons(userLessons);
    };

    useEffect(()=> {
        getLessons()
    }, [])

    return (
        <LessonCard>
            {lessons.map((lesson, index) => (
                <Lesson 
                key={index}                
                lesson={lesson}
                props={props}
                // markComplete={markComplete}
                // removeLesson={removeLesson}   
                />
            ))}
        </LessonCard>
    )

}

export default LessonList