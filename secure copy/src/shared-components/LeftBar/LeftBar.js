import React from 'react';
import BarItem from './BarItem';
import MainLogo from '../../images/main-logo.png';
import './LeftBar.css';
import{
    Link
} from 'react-router-dom';

const LeftBar =({selected})=>{
    /*Daca icon text == isSelected => aplica selected pe BarItem-ul respectiv */
    return(
        <div className="left-bar-container">
            <div className="logo-container">
                <img id="main-logo" src={MainLogo} alt="main logo"/>
                <span className="logo-text">Work <span id="bold-logo-text">Puls</span></span>
            </div>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <BarItem icon="dashboard" text="Dashboard" isSelected={selected}/>
            </Link>
            <Link to='/stats' style={{ textDecoration: 'none' }}>
                <BarItem icon="stats" text="Stats" isSelected={selected}/>
            </Link>
            <Link to='/schedule' style={{ textDecoration: 'none' }}>
                <BarItem icon="schedule" text="Schedule next" isSelected={selected}/>  
            </Link>
            <Link to='/settings' style={{ textDecoration: 'none' }}>
                <BarItem icon="settings" text="Settings" isSelected={selected}/>  
            </Link>
        </div>
    )
}

export default LeftBar;
