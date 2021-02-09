import React, { useState, useEffect } from 'react'
import Lesson from './Lesson'
import {
  __DeleteLesson,
  __GetLessons,
  __UpdateLesson,
} from "../services/LessonService";


const LessonList = (props) => {
    console.log('LessonList, props:', props)
    // const { markComplete, removeLesson } = props.account
    const [lessons, setLessons] = useState([])

    const getLessons = async () => {
      let userLessons = await __GetLessons(props.account.id);
      setLessons(userLessons);
    };

    useEffect(()=> {
        getLessons()
    }, [])

    // if (lessons !== null && lessons !== undefined) {  
    return (
        <div>
            {lessons.map((lesson, index) => (
                <Lesson 
                key={index}                
                lesson={lesson}
                props={props}
                // markComplete={markComplete}
                // removeLesson={removeLesson}   
                />
            ))}
        </div>
    )
    // } else {
    //     return (
    //         <div>
    //             You have not started your Lessons Board yet
    //         </div>
    //     )
    // }
}

export default LessonList