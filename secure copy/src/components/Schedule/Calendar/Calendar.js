import React,{useState, useEffect} from 'react';
import './Calendar.css';
import LeftArrow from '../../../images/left-arrow.png';
import RightArrow from '../../../images/right-arrow.png';
import Check from '../../../images/check.png';
import { months,timeData} from '../../../temp';
import {
    emptyCategories,
    changeStateEmptyCategories,
    changetriggerReRenderState
} from '../../../Redux/actions';

import store from '../../../Redux/store';



const Calendar = ()=>{

    //ex: 7
    const [numberMonth, setNumberMonth] = useState(null);
    
    //ex:August
    const [currentMonthLocal, setCurrentMonthLocal] = useState(null);
    
    //ziua pe care s-a facut click (blue)
    const [selectedDay, setSelectedDay] = useState(null);

    //vector de [10,14,18], zilele primite de la api in care este cel putin un todo scheduled
    const [arrayChecked, setArrayChecked] = useState([])

    const daysChecked = async()=>{
        let days = await fetch('http://localhost:4000/checked-days-in-month',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                month: numberMonth
            })
        })
        .then((resp)=>{
            return resp.json()
        })
        .catch(err=>console.log(err))
        setArrayChecked(days)
    }



    useEffect(()=>{
        var date = new Date();
        setNumberMonth(date.getMonth())
    },[])

    useEffect(()=>{
        //new Date() ne ofera nr lunii, cu vectorul months afla denumirea lunoo
        setCurrentMonthLocal(months[numberMonth])
    },[numberMonth])

    useEffect(()=>{
        //cand trec la o luna noua, nu vr sa am selectata ziua din luna precedenta
        setSelectedDay(null)
    },[numberMonth])


    useEffect(()=>{
        //fetch la api pentru vector de checked
        daysChecked()
    },[numberMonth])





    const nextMonth = ()=>{
        if(numberMonth == 11)
        {
            return
        }
        else
        {
            setNumberMonth(prev=>prev+1)
        }
    }
    const prevMonth = ()=>{
        if(numberMonth == 0)
        {
            return
        }
        else
        {
            setNumberMonth(prev=>prev-1)
        }
    }

    const handleClickOnDay = (day_number)=>{
        console.log("Click pe day nr:", day_number)
        //la click pe o zi noua, goleste categories
        //if clicked-day = inside api array
        //changeState to cheduleOld
        //else
        //changeState to scheduleNew

        if(arrayChecked.includes(day_number))
        {
            changeStateEmptyCategories('schedule-old',day_number, numberMonth)
        }
        else
        {
            changeStateEmptyCategories('schedule-new',day_number, numberMonth)
        }

        setSelectedDay(day_number);
    }

    const generateDateItselfJSX = (day_nr,week_number)=>{
        //primele 2 if's, pentru zile din alta luna
        //if week == 1 (cele > 20 fara check + className="opacity_reduced")
        //pentru click pe zi aici, salt la prev month
        if(week_number == 'week_1' && day_nr > 20)
        {
                return(
                    <div className="day-itself reduced-opacity"  onClick={()=>prevMonth()} >
                        <span className="day-itself-number">{day_nr}</span>
                        {/* <img src={Check} className="day-itself-checked" alt="check icon" /> */}

                    </div>
                )
        }

        //if week >2 (cele < 8 fara check + className="opacity_reduced")
        if(week_number != 'week_1' && week_number != 'week_2' && day_nr < 8)
        {
            return(
                <div className="day-itself reduced-opacity" onClick={()=>nextMonth()}>
                    <span className="day-itself-number">{day_nr}</span>
                    {/* <img src={Check} className="day-itself-checked" alt="check icon" /> */}

                </div>
            )
        }

        //today_selector
        //urm 2 if's pentru zilele din luna curenta
        let today_day = new Date();
        let day = today_day.getDate();
        let classDayItSelf = 'day-itself'

        if(day == day_nr && numberMonth == today_day.getMonth())
        {
            classDayItSelf ='day-itself today-selector'
        }
        else if(selectedDay == day_nr)
        {
            classDayItSelf = 'day-itself selected-day'
        }
        return(
            <div className={classDayItSelf} onClick={()=>handleClickOnDay(day_nr)}>
                <span className='day-itself-number'>{day_nr}</span>
                {/* <img src={Check} className="day-itself-checked" alt="check icon" /> */}
                {arrayChecked.find(el=>el == day_nr) 
                ? 
                <img src={Check} className="day-itself-checked" alt="check icon" />
                    :
                null
                }
            </div>
            )

    }
    const generateWeekRow = (total, array,week_number)=>{
        //itereaza normal, nu este bucata de luna
        let jsxArray = [];
        if(array[0]+6 <=total)
        {
            for(let x=array[0];x<=array[1];x++)
            {
                jsxArray.push(generateDateItselfJSX(x,week_number))
            }
        }
        else
        {
            //caz in care avem pe acelasi rand zile din doua luni 
            //completeaza doar partea din stanga a randului
            //currentMonthLocal = luna curenta

            //week_1, max din luna precedenta
            if(week_number == 'week_1')
            {
                //caz in care avem zile din luna precenta + luna curenta
                let lunaPrecedenta;
                //foloseste luna precedenta, deoarece zilele din stanga cresc pana la maxim din luna
                //precedenta, nu din luna curenta; apoi incepe "1" din luna curenta
                if(numberMonth == 0)
                {
                    lunaPrecedenta = 'December';
                }
                else
                {
                    lunaPrecedenta = months[numberMonth-1]
                }
                for(let y=array[0];y<=timeData[lunaPrecedenta].days;y++)
                {
                    jsxArray.push(generateDateItselfJSX(y,week_number))
                }
            }
            else
            {
                //week !=1, max din luna curenta, adica total
                //caz in care avem zile din luna curenta + luna urmatoare
                for(let y=array[0];y<=total;y++)
                {
                    jsxArray.push(generateDateItselfJSX(y,week_number))
                }
            }

            //restul de zile de la "1" pana la final de row
            for(let z=1;z<=array[1];z++)
            {
                jsxArray.push(generateDateItselfJSX(z,week_number))
            }
        }
       return jsxArray;
    }
    const generateWeekRowFinal = (currentMonth)=>{
        let anotherArray = [];
        let total = timeData[currentMonth].days;

        let weeksObj = timeData[currentMonth].weeks;

        for(let x in weeksObj)
        {
            anotherArray.push(
            <div className='calendar-lower-week-row'>
                {generateWeekRow(total,weeksObj[x],x).map(el=>el)}
            </div>)
        }
        return anotherArray 
    }
    return (
        <div className="calendar-container">
            <div className="calendar-container-padding">
                <div className="calendar-upper">
                    <div className="calendar-month-selector">
                        <img onClick={prevMonth} src={LeftArrow} alt="left-aroow" />
                        <span>{currentMonthLocal}</span>
                        <img onClick={nextMonth} src={RightArrow} alt="right-aroow" />
                    </div>
                    <div className="calendar-week-day">
                        <div className="week-day-item-indicator">
                            Mo 
                        </div>
                        <div className="week-day-item-indicator">
                            Tu
                        </div>
                        <div className="week-day-item-indicator">
                            We
                        </div>
                        <div className="week-day-item-indicator">
                            Th
                        </div>
                        <div className="week-day-item-indicator">
                            Fr
                        </div>
                        <div className="week-day-item-indicator">
                            Sa
                        </div>
                        <div className="week-day-item-indicator">
                            Su
                        </div>
                        
                    </div>
                </div>
                <div className="calendar-lower">
                    {currentMonthLocal == null ? null :generateWeekRowFinal(currentMonthLocal).map(el=>el)}
                    {
                    /* <div className='calendar-lower-week-row'>
                        <div className="day-itself">
                            <span className="day-itself-number">1</span>
                            <img src={Check} className="day-itself-checked" alt="check icon" />
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Calendar;