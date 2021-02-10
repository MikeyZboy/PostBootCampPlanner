import React from 'react'
import styled from 'styled-components'
import LessonForm from './LessonForm'
import LessonList from './LessonList'

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
  position: top;
  padding: 1em;
  border: 2px solid gray;
  border-radius: 15px;
  margin: 1em;
`;

const LessonsKanban = (props) => {
    const { account, getLessons, addLesson, removeLesson, markComplete } = props

    return (
        <ColumnsContainer>
            <Column>
            Not Started
            <FormHolder>
                <LessonForm account={account} addLesson={addLesson}/>
            </FormHolder>    
            <LessonList account={account} getLessons={getLessons} removeLesson={removeLesson} markComplete={markComplete}/>
            </Column>
            <Column>
            In Progress
            </Column>
            <Column>
            Complete
            </Column>
        </ColumnsContainer>
    )
}

export default LessonsKanban