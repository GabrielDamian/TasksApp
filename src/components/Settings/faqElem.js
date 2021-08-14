import React from 'react';

const FaqElement = ({data})=>{
    return(
        <div className="faq-eleme-container">
            <h4>{data.title}</h4>
            <span>{data.content}</span>
        </div>
    )
}
export default FaqElement;
