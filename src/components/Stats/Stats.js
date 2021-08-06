import React from 'react';
import LeftBar from '../../shared-components/LeftBar/LeftBar';

const Stats = ()=>{
    return(
        <div className="dashboard-container">
            <LeftBar selected="stats"/>
            <div>
                Stats content
            </div>
        </div>
    )
}

export default Stats;