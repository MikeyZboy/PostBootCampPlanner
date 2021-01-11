import React from 'react'

const Card = (props) => {
    console.log('card lesson:', props.account)
    return (
        <div>
            {/* <h4>{lesson.category}</h4>
            <a href={props.link}>{props.title}</a>
            { props.complete === true ? (
                <div>
                    <p>COMPLETED</p>
                </div>
            ):(
                <div>
                   <button>MARK COMPLETE</button>
                </div>    
            )} */}
        </div>
    )
}
// would love to filter lessons by category AND sort those results by createdAt
// button needs an onClick to update lesson.complete to true
export default Card