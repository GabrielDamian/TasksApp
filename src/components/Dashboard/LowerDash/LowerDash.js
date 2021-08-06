import React from 'react';
import './LowerDash.css';
import SwitchButton from './SwitchButton';
import CategoryTasks from './CategoryTasks';

const LowerDash = ()=>{
    return (
        <div className="lower-dash-container">
            <div className="task-intro">
                <span>Tasks</span>
                <SwitchButton />
            </div>
            <div className="lower-dash-content">
                <div className="lower-dash-content-padding">
                    <CategoryTasks />
                    <CategoryTasks />
                    <CategoryTasks />
                    <CategoryTasks />
                </div>
            </div>
        </div>
    )
}

export default LowerDash;