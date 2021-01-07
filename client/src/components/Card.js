import React from 'react'

const Card = (lesson) => {
    console.log('card lesson:', lesson)
    return (
        <div>
            <h2>Lessons</h2>
            <h4>{lesson.category}</h4>
            <a href={lesson.link}>{lesson.title}</a>
            { lesson.complete === true ? (
                <div>
                    <p>COMPLETED</p>
                </div>
            ):(
                <div>
                   <button>MARK COMPLETE</button>
                </div>    
            )}
        </div>
    )
}
// would love to filter lessons by category AND sort those results by createdAt
// button needs an onClick to update lesson.complete to true
export default Card