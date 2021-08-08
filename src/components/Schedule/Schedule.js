import React,{useState, useEffect} from 'react';
import LeftBar from '../../shared-components/LeftBar/LeftBar';
import './Schedule.css';
import Calendar from './Calendar/Calendar';
import ScheduleNew from './ScheduleNew/ScheduleNew';
import ScheduleOld from './ScheduleOld/ScheduleOld';
import EmptySchedule from './EmptySchedule';
import store from '../../Redux/store';
const Schedule = ()=>{

    const [currentState, setCurrentState] = useState('empty-state');

    useEffect(()=>{
        store.subscribe(()=>{

            let currentReduxState = store.getState().scheduleState.state;
            setCurrentState(currentReduxState);
        })
        
    })
    const handleStateJSX = ()=>{
        switch(currentState)
        {
            case 'schedule-new':
                return <ScheduleNew />
            case 'schedule-old':
                return <ScheduleOld />
            default:
                return <EmptySchedule />
        }
    }
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
                        {/* <ScheduleNew /> */}
                        {
                          handleStateJSX()
                        }
                   </div>
               </div>
            </div>
        </div>
    )
}

export default Schedule;