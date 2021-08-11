import React,{useState,useEffect} from 'react';
import './Dashboard.css';
import LeftBar from '../../shared-components/LeftBar/LeftBar';
import LittleTaskIcon from '../../images/little-taks-icon.png';
import LittleClockIcon from '../../images/clock.png';
import Cards from './Cards/Cards';
import LowerDash from './LowerDash/LowerDash';
import EmptyLowerDash from './EmptyLowerDash/EmptyLowerDash';
import {months} from '../../temp';

const Dashboard = ()=>{

    const [stateRender, setStateRender] = useState(null);


    //decomenteaza final    
    // useEffect(()=>{
    //     let intervalPointer = setInterval(()=>{
    //         setTimpRamasAzi(calculTimpRamasDinAzi())
    //     },1000)
    //     return(()=>{
    //         clearInterval(intervalPointer)
    //     })
    // },[])

    useEffect(()=>{
        let temp_inteval = setInterval(()=>{
            setUpperDashData((prev)=>{
                return{
                    ...prev,
                    timeLeft: calculTimpRamasDinAzi()
                }

            })
        },60000)
        return (()=>{
            clearInterval(temp_inteval)
        })
    })
    const [upperDashData, setUpperDashData] = useState({
        today_day:0,
        today_month:0,
        today_year:0,
        totalTasks: 0,
        totalWorkedToday:0,
        completedTasks: 0,
        failedTasks: 0,
        categories_full_data: [],
        timeLeft: 0
    });
    
    useEffect(()=>{
        decideEmptyDay(calculTimpRamasDinAzi);
    },[])
    useEffect(()=>{
        if(stateRender == 'lower-dash')
        {
            //fetch la api pentru a lua date despre ziua curenta;
            apiCurrentDay()
        }
    },[stateRender])

    const apiCurrentDay = async ()=>{
        let date = new Date();
        let day_nr = date.getDate();
        let month_nr = date.getMonth();

        let response = await fetch('http://localhost:4000/check-day-info',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day_nr: day_nr,
                month_nr: month_nr
            })
        })
        let res_json = await response.json();

        setUpperDashData({
            today_day:date.getDate(),
            today_month:date.getMonth(),
            today_year:date.getFullYear(),
            totalTasks: res_json.totalTasks,
            totalWorkedToday: res_json.workedMinutes,
            completedTasks: res_json.completedTask,
            failedTasks: res_json.failedTasks,
            timeLeft: calculTimpRamasDinAzi()
        })
    }
    const calculTimpRamasDinAzi = ()=>{
        let now = new Date();

        // tomorrow date
        let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
      
        let diff = tomorrow - now; // difference in ms

        let seconds = Math.round(diff / 1000); // convert to seconds
        let final_string = '';
        if(seconds < 3600)
        {
            let minutes = Math.floor(seconds/60);
            final_string = `0h ${minutes}`
        }
        else
        {
            let hours = Math.floor(seconds/3600);
            let minutes = Math.floor((seconds - 3600*hours)/60);
            // let seconds_r = seconds - (3600*hours) - 60*minutes;
            final_string = `${hours}h ${minutes}m`;
        }
        return final_string;
    }
    const decideEmptyDay = async()=>{
        //verifica daca exista cel putin un task setat pt ziua de astazi
        let date = new Date();
        let todayDay = date.getDate();
        let todayMonth = date.getMonth();
        let response = await fetch('http://localhost:4000/check-empty-day',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: todayDay,
                month: todayMonth
            })
        })
        .catch((err)=>{console.log("eroare fetch check empty days")})
        let res_json = await response.json();
        if(res_json.contentExist == true)
        {
            setStateRender('lower-dash')
        }
        else if(res_json.contentExist == false)
        {
            setStateRender('empty-lower-dash')
        }
    }


    const decideStateRender = ()=>{
        switch(stateRender)
        {
            case 'lower-dash':
                return <LowerDash refetch_api={apiCurrentDay} upperDashData={upperDashData}/>
            case 'empty-lower-dash':
                return <EmptyLowerDash />
            default:
                return null;
        }
    }

    return(
        <div className="dashboard-container">
            <LeftBar selected="dashboard"/>
            <div className="dashboard-content">
                <div className="dashboard-padding">
                    <div className="upper-dashbord">
                        <div className="title-tab">
                            <span>Dashboard</span>
                        </div>
                        <div className="main-stats">
                            <div className="text-data">
                               <div className="today-date">
                                    <span>
                                        {`Today: 
                                        ${upperDashData.today_day} 
                                        ${months[upperDashData.today_month]} 
                                        ${upperDashData.today_year}`}
                                    </span>
                               </div>
                               <div className="today-date-info">
                                <div className="little-card-today-info">
                                    <img src={LittleTaskIcon} alt="totals task icon" />
                                    <span>Total tasks today: {upperDashData.totalTasks}</span>
                                </div>
                                <div className="little-card-today-info">
                                    <img src={LittleClockIcon} alt="time left icon" />
                                        <span>Time left: {upperDashData.timeLeft}</span>
                                </div>
                               </div>
                            </div>
                            <div className="cards-data">
                                <div className="card-data-padding">
                                    <Cards title='Total worked today' content={upperDashData.totalWorkedToday}/>
                                    <Cards title='Completed' content={upperDashData.completedTasks}/>
                                    <Cards title='Failed' content={upperDashData.failedTasks}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lower-dashboard">
                        {decideStateRender()}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dashboard;