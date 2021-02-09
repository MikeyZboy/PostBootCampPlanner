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

const LessonCard = styled.div`
  position: relative;
  display: inline-block;
  width: 1fr;
  border-radius: 
`;

const LessonsKanban = (props) => {
    console.log('LessonsKanban props', props)
    const { account, getLessons, addLesson, removeLesson, markComplete } = props

    return (
        <ColumnsContainer>
            <Column>
            Not Started
            <div>
                <LessonForm account={account} addLesson={addLesson}/>
            </div>
            <div>
                <LessonList account={account} getLessons={getLessons} removeLesson={removeLesson} markComplete={markComplete}/>
            </div>
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