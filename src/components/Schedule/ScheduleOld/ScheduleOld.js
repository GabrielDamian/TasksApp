import React,{useEffect, useState} from 'react';
import './ScheduleOld.css';
import store from '../../../Redux/store';
import OldCategories from './OldCategories/OldCategories';

const ScheduleOld = ()=>
{
    const [date, setDate] = useState({
        day: null,
        month: null
    })
    
    const [serverData, setServerData] = useState(null);

    useEffect(()=>{
        //setam listener pentru day si month din store
        store.subscribe(()=>{
            let storeState = store.getState();
            setDate({
                day: storeState.scheduleState.selectedDay,
                month: storeState.scheduleState.selectedMonth
            })
        })

        //setam date cu day si month din store
        let storeState = store.getState();
        setDate({
            day: storeState.scheduleState.selectedDay,
            month: storeState.scheduleState.selectedMonth
        })
    },[])

    useEffect(()=>{
        fetchOldServerData(); 
    },[date])


    const fetchOldServerData = async()=>{
        let response = await fetch('http://localhost:4000/info-old-day',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: store.getState().scheduleState.selectedDay,
                month: store.getState().scheduleState.selectedMonth
            })
        })
        let json = await response.json()
        setServerData(json)
        
        //setServerData(response);
    }

    const reFetchFromChild = ()=>{
        fetchOldServerData()
    }

    //serverData, intre null si date complete are un state de vector gol ([])
    return(
        <div className="schedule-old-container">
            <div className="schedule-old-container-padding">
                <div className="schedule-old-cat-container">
                    {serverData == null ? null :<OldCategories arr_data={serverData} fct_refetch={reFetchFromChild} />}
                </div>
            </div>
        </div>
    )
}

export default ScheduleOld;