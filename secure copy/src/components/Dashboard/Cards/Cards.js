import React from 'react';
import './Cards.css';

const TotalTimeCard = ({title, content})=>
{
    return(
        <div className="card-container">
                <div className="padding-card">
                    <span className="title-card">
                        {title}
                    </span>
                    <span className="content-card">
                        {content}
                    </span>
                </div>
        </div>
    )
}

export default TotalTimeCard;
