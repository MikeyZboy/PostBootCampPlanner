import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import LessonForm from "../components/LessonForm";
import { __GetLessons } from '../services/LessonService'

const Lessons = (props) => {

  const { account } = props;
  const [lessons, setLessons] = useState([]);
  console.log("Lessons page, account:", account);

  const getLessons = async () => {
      let userLessons = await __GetLessons(account.id)
        setLessons(userLessons)
  }

  const addLesson = (lesson) => {
      console.log('fired')
    setLessons([ ...lessons, lesson ]);
  };

  useEffect(() => {
    getLessons()
}, []);

  return (
    <div>
      <div>
        <h3>What have you learned?</h3>
        {lessons.length ? (
          lessons.map((lesson, index) => (
            <div key={index}>
              <h4>{lesson.category}</h4>
              <a href={lesson.link}>{lesson.title}</a>
              {lesson.complete === true ? (
                <div>
                  <p>COMPLETED</p>
                </div>
              ) : (
                <div>
                  <button>MARK COMPLETE</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>
            <h3>Searching for your Lessons...</h3>
          </div>
        )}
      </div>
      <div>
        <h3>What do you plan to learn?</h3>
        <LessonForm account={account} addLesson={addLesson} />
      </div>
    </div>
  );
};

export default Lessons;
