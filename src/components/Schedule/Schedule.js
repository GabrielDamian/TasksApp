import React from 'react';
import LeftBar from '../../shared-components/LeftBar/LeftBar';
import './Schedule.css';
import Calendar from './Calendar/Calendar';
import ScheduleNew from './ScheduleNew/ScheduleNew';
import ScheduleOld from './ScheduleOld/ScheduleOld';
const Schedule = ()=>{
    return(
        <div className="dashboard-container">
            <LeftBar selected="schedule"/>
            <div className="schedule-container">
               <div className="schedule-content-padding">
                   <div className="schedule-content-calendar">
                    <div className="schedule-title-tab">
                        <span>Schedule next</span>
                    </div>
                    <div className="schedule-content-calendar-main">
                        <Calendar />
                    </div>
                   </div>
                   <div className="schedule-content-selector">
                        <ScheduleNew />
                   </div>
               </div>
            </div>
        </div>
    )
}

export default Schedule;