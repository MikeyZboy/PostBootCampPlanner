import React, { useState, useEffect } from "react";
import LessonForm from "../components/LessonForm";
import TextInput from '../components/TextInput'
import {
  __DeleteLesson,
  __GetLessons,
  __UpdateLesson,
} from "../services/LessonService";
import '../styles/Layout.css'
import '../styles/Card.css'
import styled from 'styled-components'

const LessonCardContainer = styled.div`
  display: inline-block;
  position: relative;
  mid-width: 120px;
  width: 180px;
  height: 240px;
  scrollable: true;
  margin: 0 auto;
  cursor: pointer;
  color: darkgrey;
  &:hover {
    box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const Lessons = (props) => {
  const { account } = props;
  const [lessons, setLessons] = useState([]);
  const [ category, setCategory ] = useState([])

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

  const markComplete = async (lesson) => {
    let id = account.id;
    let formData = {
      title: lesson.title,
      category: lesson.category,
      link: lesson.link,
      complete: true,
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

   const handleChange = (e) => {
     e.preventDefault();
     setCategory(e.target.value);
   };

   const handleSubmit = async (e) => {
     e.preventDefault()
     try {
       // to have category persist on card
       // will need to follow the Goal update route with the Lessons model
       const newCategory = e.target.value;
       setCategory(newCategory);
     }catch (error){
       console.log(error)
     }
   }

  return (
    <div>
      <header className="head">
        <h1>Lessons</h1>
      </header>
      <LessonCardContainer>
      <div className="main">
        <input onSubmit={(e) => handleSubmit(e)}  
          className="goal-input"
          type="text"
          name="category"
          value={category}
          placeholder="__________________"
          onChange={handleChange} 
        />  
        {lessons.length ? (
          lessons.map((lesson, index) => (
            <div key={lesson} className="card">
            {lesson.complete === true ? (
              <div key={index}>
              <a href={lesson.link}>{lesson.title}</a>
              <p>COMPLETED</p>
              <button onClick={() => removeLesson(lesson)}>REMOVE</button>
              </div>
              ) : (
                <div key={index}>
                  <li> <a href={lesson.link}>{lesson.title}</a></li>
                  <button onClick={() => markComplete(index)}>
                  MARK COMPLETE
                  </button>
                  <button onClick={() => removeLesson(lesson)}>REMOVE</button>
                </div>
              )}
                </div>  
                ))
                ) : (
                <div>
                  <h3>Loading Lessons...</h3>
                </div>
                )}
      </div>
      <div>
      <LessonForm account={account} addLesson={addLesson} />
      </div>     
      </LessonCardContainer>
      {/* <div className="main">
        <h3>What do you plan to learn?</h3>
      </div> */}
    </div>
  );
};

export default Lessons;
