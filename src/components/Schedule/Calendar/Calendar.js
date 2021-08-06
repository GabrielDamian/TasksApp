import React from 'react';
import './Calendar.css';
import LeftArrow from '../../../images/left-arrow.png';
import RightArrow from '../../../images/right-arrow.png';
import Check from '../../../images/check.png';

const Calendar = ()=>{
    return (
        <div className="calendar-container">
            <div className="calendar-container-padding">
                <div className="calendar-upper">
                    <div className="calendar-month-selector">
                        <img src={LeftArrow} alt="left-aroow" />
                        <span>July</span>
                        <img src={RightArrow} alt="right-aroow" />
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
                    <div className='calendar-lower-week-row'>
                        <div className="day-itself">
                            <span className="day-itself-number">1</span>
                            <img src={Check} className="day-itself-checked" alt="check icon" />
                        </div>
                        <div className="day-itself">
                            <span className="day-itself-number">2</span>
                            <img src={Check} className="day-itself-checked" alt="check icon" />
                        </div>
                        <div className="day-itself">
                            <span className="day-itself-number">3</span>
                            <img src={Check} className="day-itself-checked" alt="check icon" />
                        </div>
                        <div className="day-itself">
                            <span className="day-itself-number">4</span>
                            <img src={Check} className="day-itself-checked" alt="check icon" />
                        </div>
                        <div className="day-itself">
                            <span className="day-itself-number">5</span>
                            <img src={Check} className="day-itself-checked" alt="check icon" />
                        </div>
                        <div className="day-itself">
                            <span className="day-itself-number">6</span>
                            <img src={Check} className="day-itself-checked" alt="check icon" />
                        </div>
                        <div className="day-itself">
                            <span className="day-itself-number">7</span>
                            <img src={Check} className="day-itself-checked" alt="check icon" />
                        </div>
                        
                    </div>
                    <div className='calendar-lower-week-row'>
                        <div className="day-itself">
                            8
                        </div>
                        <div className="day-itself">
                            9
                        </div>
                        <div className="day-itself">
                            10
                        </div>
                        <div className="day-itself">
                            11
                        </div>
                        <div className="day-itself">
                            12
                        </div>
                        <div className="day-itself">
                            13
                        </div>
                        <div className="day-itself">
                            14
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar;