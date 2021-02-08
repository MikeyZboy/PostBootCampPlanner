import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

const Calendar = () => {
    return (
        <div>
            <FullCalendar 
            plugins={[ timeGridPlugin ]}
            initialView= "timeGridWeek"
            />
        </div>
    )
}

export default Calendar