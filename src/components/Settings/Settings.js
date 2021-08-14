import React,{useState,useEffect} from 'react';
import LeftBar from '../../shared-components/LeftBar/LeftBar';
import './Settings.css';
import FaqElement from './faqElem';

const Settings = ()=>{

    const faqs = [
        {
            title:'Introduction',
            content: 'This app was created for a demo purpose. The stats and schedule system only works for days in this year. This is why in the calendar from the "Schedule" section, you cannot selected days from the next year.'
        },
        {
            title: 'What about the warning to "not schedule only future days"',
            content: "I don't wanted to limitate the calendar section by making only the future days available for editing. Also the system creates his stats for one day, when today's day date match the same date. Any update at 'total tasks' will not be updated."
        },
        {
            title: 'Bug report',
            content: 'Feel free to report me any bug report at: damiangabriel54@yahoo.com'
        },
        {
            title: 'GitHub',
            content: 'https://github.com/GabrielDamian/TasksApp'
        }
    ]
    return(
    <div className="dashboard-container">
        <LeftBar selected="settings"/>
        <div className="settings-container">
            <div className="settings-container-padding">
                <div className="settings-title">
                    Settings
                </div>

                <div className="settins-faq">
                    <div className="settings-faq-padding">
                        <span>FAQ</span>
                        {
                            faqs.map((el)=>{
                                return (<FaqElement data={el}/>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Settings;