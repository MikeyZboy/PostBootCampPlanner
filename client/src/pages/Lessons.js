import React, { useState, useEffect } from "react";
import Nav from '../components/Nav'
import LessonForm from "../components/LessonForm";
import { __DeleteLesson, __GetLessons, __UpdateLesson } from "../services/LessonService";

const Lessons = (props) => {
  const { account } = props;
  const [lessons, setLessons] = useState([]);
  console.log("Lessons page, account:", account);

  const getLessons = async () => {
    let userLessons = await __GetLessons(account.id);
    setLessons(userLessons);
  };

  const addLesson = (lesson) => {
    setLessons([...lessons, lesson]);
  };

  useEffect(() => {
    getLessons();
  }, []);

  // update Lesson - if user wants to update title, link, or category?
  // const updateLesson = () => {
  // }

  // struggling to grab a value that will mark that lesson complete
  const markComplete = async (lesson) => {
    console.log('markComplete click: index>', lesson)
    let id = account.id
    let formData = { 
      title: lesson.title,
      category: lesson.category,
      link: lesson.link,
      complete: true
  }
    let updatedLessons = await __UpdateLesson(id, formData)
    setLessons(updatedLessons)
    getLessons()
}
// may need to use a sort in the above function - they're returning randomly...

  const removeLesson = async (lesson) => {
    let id = lesson.id
    const newLessons = await __DeleteLesson(id)
    setLessons(newLessons)
    getLessons()
  }
  
  console.log(lessons)

  return (
    <div>
      <div>
        <h1>Keep Grinding {account.firstName}!</h1>
      </div>
      <div>
        <Nav />
      </div>
      <div>
        <h3>What have you learned?</h3>
        {lessons.length ? (
          lessons.map((lesson, index) => (
            <div key={index}>
              {lesson.complete === true ? (
                <div key={index}>
                  <h4>{lesson.category}</h4>
                  <a href={lesson.link}>{lesson.title}</a>
                  <p>COMPLETED</p>
                  <button onClick={() => removeLesson(lesson)}>DELETE</button>
                </div>
              ) : (
                <div key={index}>
                  <h4>{lesson.category}</h4>
                  <a href={lesson.link}>{lesson.title}</a>
                  <button onClick={() => markComplete(index)}>
                    MARK COMPLETE
                  </button>
                  <button onClick={() => removeLesson(lesson)}>DELETE</button>
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
