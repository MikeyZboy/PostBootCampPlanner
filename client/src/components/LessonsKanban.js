import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import LessonForm from './LessonForm'
import LessonList from './LessonList'
import { Modal } from 'react-responsive-modal'

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
    const { account, getLessons, addLesson, removeLesson, markComplete } = props

    const [open, setOpen] = useState(false)

    useEffect(()=> {
      getLessons();
      setOpen()
    },[])

    const showModal = () => setOpen(true)
    const hideModal = () => setOpen(false)

    return (
        <ColumnsContainer>
            <Column>
            Not Started
            <Button onClick={showModal}> Add Lesson </Button>
              <Modal open={open} onClose={hideModal}>            
                <FormHolder onClose={hideModal}>
                  <LessonForm account={account} addLesson={addLesson} onClose={hideModal}/>
                </FormHolder>
              </Modal>
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