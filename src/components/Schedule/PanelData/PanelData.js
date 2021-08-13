import React,{useState,useEffect} from 'react';
import './PanelData.css';
import store from '../../../Redux/store';
import {months} from '../../../temp';

import MuiAlert from '@material-ui/lab/Alert';
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
                <WarningPanel />
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

function Alert(props) {
    return <MuiAlert elevation={3} variant="filled" {...props} />;
  }

const WarningPanel = ()=>{
    return(
        <div className="warning-container">
           <Alert severity="warning">
                Don't modify days in the past (including today's date).
                Schedule & modify only future days.
           </Alert> 
        </div>
    )
}
export default PanelData;
