import React, {useState} from 'react'
import { __DeleteLesson, __UpdateLesson, __GetLessons } from "../services/LessonService"

const Lesson = (props) => {
    const { account } = props
    const [lessons, setLessons] = useState([])

    const getLessons = async () => {
        let userLessons = await __GetLessons(account.id);
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

    // if (lessons) { 
    return (
      <div>
        <a href={props.lesson.link}>
        <img
          class="icon-favicon"
          src={`https://icons.duckduckgo.com/ip2/${props.lesson.link}.ico`}
        />
            {props.lesson.title}
            </a>
        <button onClick={() => markComplete(props.lesson.index)}>MARK COMPLETE</button>
        <button onClick={() => removeLesson(props.lesson)}>REMOVE</button>
      </div>
    );
    // } else {
    //     return (
    //         <div>
    //             Learn something!
    //         </div>
    //     )
    // }
}

export default Lesson