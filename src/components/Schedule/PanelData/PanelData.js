import React,{useState,useEffect} from 'react';
import './PanelData.css';
import store from '../../../Redux/store';
import {months} from '../../../temp';

const PanelData = ()=>{

    
    const [date, setDate] = useState(null);

    useEffect(()=>{
        store.subscribe(()=>{
            let storeState = store.getState();
            console.log("store updatE", storeState.selectedDay)
            setDate({
                day: storeState.scheduleState.selectedDay,
                month: storeState.scheduleState.selectedMonth
            })
        })
    },[])

    return(
        <div className="panel-data-container">
            <div className="panel-data-padding">
                {date == null ? null : <NiceDate day={date.day} month={date.month}/>}
            </div>
        </div>
    )
}

const NiceDate = ({day, month})=>{
    return(
        <div className="panel-data-nice-day">
            <div className="panel-data-nice-title">
                <span>Selected day:</span>
            </div>
            <div className="panel-data-nice-content">
                {day} - {months[month]} 2021
            </div>
        </div>
    )
}
export default PanelData;
