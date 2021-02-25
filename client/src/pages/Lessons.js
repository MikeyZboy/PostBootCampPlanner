import React, { useState, useEffect } from "react";
import LessonForm from "../components/LessonForm";
import NewLessonList from "../components/NewLessonList";
import InProgressList from '../components/InProgressList'
import CompletedList from '../components/CompletedList'
import {
  __DeleteLesson,
  __GetLessons,
  __UpdateLesson,
} from "../services/LessonService";
import "../styles/Layout.css";
import "../styles/Card.css";
import styled from "styled-components";

const ColumnsContainer = styled.section`
  position: relative;
  margin: 0 auto;
  margin-top: 5em;
  height: 75vh;
  width: 75vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: grey;
  border: 5px solid black;
  box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.4);
`;

const Column = styled.div`
  position: relative;
  display: inline-block;
  width: 1fr;
  border: 2px solid grey;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const FormHolder = styled.div`
  position: relative;
  margin: 25px;
  border: 2px solid gray;
  border-radius: 15px;
  background-color: #194d44;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  color: transparent;
`;

const Lessons = (props) => {
  const { account } = props;

  const [lessons, setLessons] = useState([]);
  const [ show, setShow ] = useState(false)

  //setShow => should change the behavior of the formholder
  // e.g. "display: none || block"


  const getLessons = async () => {
    let userLessons = await __GetLessons(account.id);
    setLessons(userLessons);
    console.log('Lessons.js, getLessons hit')
  };

  const addLesson = (lesson) => {
    setLessons([...lessons, lesson]);
    getLessons();
    console.log('Lessons.js, addLesson HIT')
  };

  useEffect(() => {
    getLessons();
  }, []);

  const changeStatus = async (e, lesson) => {
    let statusValue = e.target.value;
    let id = props.account.id;
    let formData = {
      title: lesson.title,
      category: lesson.category,
      link: lesson.link,
      status: statusValue,
      account_id: id,
    };
    let updatedLessons = await __UpdateLesson(id, formData);
    setLessons(updatedLessons);
    getLessons();
    console.log('lessons.js changeStatus HIT')
  };

  const removeLesson = async (lesson) => {
    let id = lesson.id;
    const newLessons = await __DeleteLesson(id);
    setLessons(newLessons);
    getLessons();
    console.log('lessons.js, removeLesson hit')
  };

  return (
    <div>
      <header className="head">
        <h1>Lessons</h1>
      </header>
      <ColumnsContainer className="main">
        <Column>
          <h4>Not Started</h4>
          { account.lessons !== [] ? (
          
              <FormHolder>
                <LessonForm account={account} addLesson={addLesson} />
              </FormHolder>
            
          ) : (
            <div>
            <Button onClick={setShow}> Add Lesson </Button>
            <FormHolder>
              <LessonForm account={account} addLesson={addLesson} />
            </FormHolder>
            </div>
          )}
          {account.lessons ? (
            <NewLessonList
              account={account}
              getLessons={getLessons}
              changeStatus={changeStatus}
              removeLesson={removeLesson}
            />
          ):(
            <></>
          )}
        </Column>
        <Column>
          <h4>In Progress</h4>
          <InProgressList
            account={account}
            getLessons={getLessons}
            changeStatus={changeStatus}
            removeLesson={removeLesson}
          />
        </Column>
        <Column>
          <h4>Complete</h4>
          <CompletedList
            account={account}
            getLessons={getLessons}
            changeStatus={changeStatus}
            removeLesson={removeLesson}
          />
        </Column>
      </ColumnsContainer>
    </div>
  );
};

export default Lessons;
