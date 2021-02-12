import React, { useState, useEffect } from "react";
import LessonForm from "../components/LessonForm";
import LessonList from "../components/LessonList";
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
  padding: 1em;
  margin: 1em;
  border: 2px solid gray;
  border-radius: 15px;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid gray;
  border-radius: 3px;
  background: #1fb0b5;
  color: white;
`;

const Lessons = (props) => {
  const { account } = props;

  const [lessons, setLessons] = useState([]);
  const [updated, setUpdated] = useState([]);

  const getLessons = async () => {
    let userLessons = await __GetLessons(account.id);
    setLessons(userLessons);
  };

  const addLesson = (lesson) => {
    setLessons([...lessons, lesson]);
    getLessons();
  };

  useEffect(() => {
    getLessons()
  }, []);

  // const markComplete = async (lesson) => {
  //   let id = account.id;
  //   let formData = {
  //     title: lesson.title,
  //     category: lesson.category,
  //     link: lesson.link,
  //     complete: true,
  //   };
  //   let updatedLessons = await __UpdateLesson(id, formData);
  //   setLessons(updatedLessons);
  //   getLessons();
  // };

  const removeLesson = async (lesson) => {
    let id = lesson.id;
    const newLessons = await __DeleteLesson(id);
    setLessons(newLessons);
    getLessons();
  };

  return (
    <div>
      <header className="head">
        <h1>Lessons</h1>
      </header>
      <ColumnsContainer>
        <Column>
          <h4>Not Started</h4>
          <Button> Add Lesson </Button>
          <FormHolder>
            <LessonForm account={account} addLesson={addLesson} />
          </FormHolder>
          <LessonList account={account} getLessons={getLessons} />
        </Column>
        <Column>
          <h4>In Progress</h4>
          <LessonList account={account} getLessons={getLessons} />
        </Column>
        <Column>
          <h4>Complete</h4>
          <LessonList account={account} getLessons={getLessons} />
        </Column>
      </ColumnsContainer>
    </div>
  );
};

export default Lessons;
