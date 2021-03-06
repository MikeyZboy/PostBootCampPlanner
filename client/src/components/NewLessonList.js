import React, { useState, useEffect } from 'react'
import Lesson from './Lesson'
import {
  __DeleteLesson,
  __GetLessons,
  __UpdateLesson,
} from "../services/LessonService";
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'

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
  };

  useEffect(() => {
    getLessons();
  }, []);

  const changeStatus = async (e, lesson) => {
    let id = lesson.id;
    let formData = {
      title: lesson.title,
      category: lesson.category,
      link: lesson.link,
      status: e.target.value,
      account_id: props.account.id,
    };
    let updatedLessons = await __UpdateLesson(id, formData);
    setLessons(updatedLessons);
    getLessons();
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
                onClick={(e) => changeStatus(e, lesson)}
                value={"In Progress"}
              >
                Making Progress
              </button>
              <button
                onClick={(e) => changeStatus(e, lesson)}
                value={"Complete"}
              >
                Done!
              </button>
              <button onClick={(e) => removeLesson(e, lesson)}>REMOVE</button>
            </LessonCard>
          ) : (
            <></>
          )
        )
      ) : (
        <FontAwesomeIcon icon={faClipboardList}/>
      )}
    </div>
  );
};

export default NewLessonList