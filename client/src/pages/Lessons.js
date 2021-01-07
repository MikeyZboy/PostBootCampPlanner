import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import LessonForm from "../components/LessonForm";

const Lessons = (props) => {
  const { account, setNeedsRefresh } = props;
//   const { lessons } = props.account
  const [lessons, setLessons] = useState([])
  console.log("Lessons page, account:", account);
    // there is a pending promise...

    // is this a place for useeffecT?
  useEffect(()=> {
    //   setNeedsRefresh(false)
  }, [])  

  const handleSubmit = (e) => {
      e.preventDefault()
      setNeedsRefresh(true)
  }

  return (
    <div>
      <div>
         <h3>What have you learned?</h3>
        {
        account.lessons ? (
        account.lessons.map((lesson, index) => (
          <div key={index}>
            <h4>{lesson.category}</h4>
            <a href={lesson.link}>{lesson.title}</a>
            {lesson.complete === true ? (
              <div>
                <p>COMPLETED</p>
              </div>
            ) : (
              <div>
                <button>MARK COMPLETE</button>
              </div>
            )}
          </div>
        ))):(
            <div>
                <h3>Searching for your Lessons...</h3>
            </div>
        )}
      </div>
      <div>
        <h3>What do you plan to learn?</h3>
        <LessonForm {...props} setNeedsRefresh={setNeedsRefresh} onSubmit={(e)=> handleSubmit(e)} />
      </div>
    </div>
  );
};

export default Lessons;
