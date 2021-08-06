import React,{useState, useEffect} from 'react';
import './LeftBar.css';
import DashboardIcon from '../../images/dashboard.png';
import StatsIcon from '../../images/stats.png';
import ScheduleIcon from '../../images/schedule.png';
import SetingsIcon from '../../images/settings.png';

import DashboardIconSelected from '../../images/dashboard-selected.png';
import StatsIconSelected from '../../images/stats-selected.png';
import ScheduleIconSelected from '../../images/schedule-selected.png';
import SetingsIconSelected from '../../images/settings-selected.png';

const BarItem =({icon,text,isSelected})=>{
    //name collision icon_ and icon from props (sol: icon_)
    const [icon_, setIcon] = useState(null);

    
    useEffect(()=>{
        switch(icon)
        {
            case 'dashboard':
                if(isSelected === 'dashboard')
                {
                    setIcon(DashboardIconSelected)
                }
                else
                {
                    setIcon(DashboardIcon)
                }
                break;
            case 'stats':
                if(isSelected === 'stats')
                {
                    setIcon(StatsIconSelected)
                }
                else
                {
                    setIcon(StatsIcon)
                }
                break;
            case 'schedule':
                if(isSelected === 'schedule')
                {
                    setIcon(ScheduleIconSelected)
                }
                else
                {
                    setIcon(ScheduleIcon)
                }
                break;
            case 'settings':
                if(isSelected === 'settings')
                {
                    setIcon(SetingsIconSelected)
                }
                else
                {
                    setIcon(SetingsIcon)
                }
                break;
            default:
                setIcon(DashboardIcon)
        }
    },[])
    return(
        <div className={isSelected === icon ? 'bar-item-container-selected': 'bar-item-container'}>
            <div className="center-items">
                <div className="icon">
                    <img src={icon_} alt="ceva"/>
                </div>
                <span className={isSelected === icon ? 'selected-item-bar':'unselected-item-bar'}>
                    {text}
                </span>
            </div>

        </div>
    )
}

export default BarItem;
