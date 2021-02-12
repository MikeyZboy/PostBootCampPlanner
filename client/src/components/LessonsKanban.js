import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import LessonForm from './LessonForm'
import LessonList from './LessonList'
import {
  __DeleteLesson,
  __GetLessons,
  __UpdateLesson,
} from "../services/LessonService";

const ColumnsContainer = styled.section`
  position: relative;
    display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: grey;
  border: 5px solid black;
  box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.4);
`;

const Column = styled.div`
  position: relative;
  display: inline-block;
  height: 100vh;
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
  background: #1FB0B5;
  color: white;
`;

const LessonsKanban = (props) => {
  console.log('LessonsKanban props:', props)
  const { account } = props;

  const [lessons, setLessons] = useState([]);
  const [updatedLessons, manageUpdatedLessons] = useState([]);

  
  //getLessons => grab all the lessons
  const getLessons = async () => {
    let userLessons = await __GetLessons(props.account.id);
    setLessons(userLessons);
  };
  
  useEffect(() => {
    getLessons();
  }, []);
  
  //addLesson => to add the new lesson to the lessons state
  const addLesson = (lesson) => {
    setLessons([...lessons, lesson]);
  };

  //updateLesson (we're going to change current markComplete) => to move the lesson from new -> in progress -> completed (or other directions)
  const updateLessons = () => {

  }
  
  //deleteLesson => to remove the lesson from your list
  const deleteLesson = () => {

  }



  return (
    <ColumnsContainer account={account}>
      <Column account={account}>
        Not Started
        <Button> Add Lesson </Button>
        <FormHolder account={account}>
          <LessonForm
            account={account}
            addLesson={addLesson}
          />
        </FormHolder>
        <LessonList
          account={account}
          getLessons={getLessons}
        />
      </Column>
      <Column>
        In Progress
        <LessonList
          account={account}
          getLessons={getLessons}
        />
      </Column>
      <Column>
        Complete
        <LessonList
          account={account}
          getLessons={getLessons}
        />
      </Column>
    </ColumnsContainer>
  );
}

export default LessonsKanban