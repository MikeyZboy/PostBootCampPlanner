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

const NewLessonList = (props) => {
  const [lessons, setLessons] = useState([]);

  const getLessons = async () => {
    let userLessons = await __GetLessons(props.account.id);
    setLessons(userLessons);
    console.log(" getLessons fired");
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
      account_id: id,
    };
    let updatedLessons = await __UpdateLesson(id, formData);
    setLessons(updatedLessons);
    getLessons();
    console.log(' changeStatus => getLessons fired')
  };

  const removeLesson = async (e, lesson) => {
    let id = lesson.id;
    const newLessons = await __DeleteLesson(id);
    setLessons(newLessons);
    getLessons();
  };

  return (
    <div>
      {lessons.length ? (
        lessons.map((lesson, index) =>
          lesson.status === "Not Started" ? (
            <LessonCard>
              <Lesson key={index} lesson={lesson} props={props} />
              <button
                value={"In Progress"}
                onClick={(e) => changeStatus(e, lesson)}
              >
                Making Progress
              </button>
              <button
                value={"Complete"}
                onClick={(e) => changeStatus(e, lesson)}
              >
                Done!
              </button>
              <button onClick={(e) => removeLesson(e, lesson)}>
                REMOVE
              </button>
            </LessonCard>
          ) : (
            <div>Save for a FontAwesome Img</div>
          )
        )
      ) : (
        <div>Save for a FontAwesome Img</div>
      )}
    </div>
  );
};

export default NewLessonList