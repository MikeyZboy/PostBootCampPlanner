import React, {useState} from 'react'
import { __DeleteLesson, __UpdateLesson, __GetLessons } from "../services/LessonService"
import styled from 'styled-components'

const Card = styled.div`
    position: relative;
    padding: 1em;
    border: 2px solid gray;
    border-radius: 15px 30px;
    margin: 1em;
`;

const Favicon = styled.img`
    size: 16px;
    min-height: 12px;
    min-width: 12px;
    max-height: 24px;
    max-width: 24px;
    padding: 1px 5px 1px 2px;
`;

const Lesson = (props) => {
    const { account } = props
    const [lessons, setLessons] = useState([])

    const getLessons = async (id) => {
        let userLessons = await __GetLessons(id);
        setLessons(userLessons);
    };

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
        console.log('lesson to be removed:', lesson)
        let id = lesson.id;
        const newLessons = await __DeleteLesson(id);
        setLessons(newLessons);
        getLessons();
    };
    
    return (
      <div>
        <a href={props.lesson.link}>
        <Favicon
          src={`https://icons.duckduckgo.com/ip2/${props.lesson.link}.ico`}
        />
            {props.lesson.title}
            </a>
        <button onClick={() => markComplete(props.lesson.index)}>MARK COMPLETE</button>
        <button onClick={() => removeLesson(props.lesson)}>REMOVE</button>
      </div>
    );
}

export default Lesson