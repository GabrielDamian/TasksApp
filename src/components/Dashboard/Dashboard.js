import React from 'react';
import './Dashboard.css';
import LeftBar from '../../shared-components/LeftBar/LeftBar';
import LittleTaskIcon from '../../images/little-taks-icon.png';
import LittleClockIcon from '../../images/clock.png';
import Cards from './Cards/Cards';
import LowerDash from './LowerDash/LowerDash';

const Dashboard = ()=>{
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
                                    <span>Today: 20 July 2021</span>
                               </div>
                               <div className="today-date-info">
                                <div className="little-card-today-info">
                                    <img src={LittleTaskIcon} alt="totals task icon" />
                                    <span>Total tasks today: 31</span>
                                </div>
                                <div className="little-card-today-info">
                                    <img src={LittleClockIcon} alt="time left icon" />
                                        <span>Time left: 7h 20m</span>
                                </div>
                               </div>
                            </div>
                            <div className="cards-data">
                                <div className="card-data-padding">
                                    <Cards title='Total worked today' content='3h:45m'/>
                                    <Cards title='Completed' content='3/15'/>
                                    <Cards title='Failed' content='2'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lower-dashboard">
                        <LowerDash />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;