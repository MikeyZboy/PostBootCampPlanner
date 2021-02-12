import React, { useState, useEffect } from 'react'
import Lesson from './Lesson'
import {
  __DeleteLesson,
  __GetLessons,
  __UpdateLesson,
} from "../services/LessonService";
import styled from 'styled-components'

const LessonCard = styled.ul`
  position: relative;
  border: 2px solid gray;
  border-radius: 15px 30px;
  padding: 0.25em;
  margin: 0.5em;
`;

const InProgressList = (props) => {
  const [lessons, setLessons] = useState([]);

  const getLessons = async () => {
    let userLessons = await __GetLessons(props.account.id);
    setLessons(userLessons);
  };

  useEffect(() => {
    getLessons();
  }, []);

  const changeStatus = async (e, lesson) => {
    let id = props.account.id;
    let formData = {
      title: lesson.title,
      category: lesson.category,
      link: lesson.link,
      status: e.target.value,
      account_id: id
    };
    let updatedLessons = await __UpdateLesson(id, formData);
    setLessons(updatedLessons);
    getLessons();
  };

  const removeLesson = async (lesson) => {
    let id = lesson.id;
    const newLessons = await __DeleteLesson(id);
    setLessons(newLessons);
    getLessons();
  };

  return (
    <div>
      {
      lessons.length ? 
      (lessons.map((lesson, index) => (
        lesson.status === "In Progress" ? (
        <LessonCard>
          <Lesson
            key={index}
            lesson={lesson}
            props={props}
          />
        <button
          value={"In Progress"}
          onClick={() => changeStatus(props.lesson.index)}
        >
          Making Progress
        </button>
        <button
          value={"Complete"}
          onClick={() => changeStatus(props.lesson.index)}
        >
          Done!
        </button>
        <button value={"Removed"} onClick={() => removeLesson(lesson)}>REMOVE</button>
        </LessonCard>
      ) : (
        <div>
          Save for a FontAwesome Img
        </div>
      )
      ))) : (
        <div>
            Save for a FontAwesome Img
        </div>
      )
    }
    </div>
  );
}

export default InProgressList