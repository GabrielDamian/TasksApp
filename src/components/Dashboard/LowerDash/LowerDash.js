import React,{useState,useEffect} from 'react';
import './LowerDash.css';
import SwitchButton from './SwitchButton';
import CategoryTasks from './CategoryTasks';

const LowerDash = ()=>{

    const [categoriesToday, setCategoriesToday] = useState(null);
    useEffect(()=>{

    },[])
    const getCategoriesApi =async ()=>
    {
        //!!!!!!!!!!
    }
    return (
        <div className="lower-dash-container">
            <div className="task-intro">
                <span>Tasks</span>
                <SwitchButton />
            </div>
            <div className="lower-dash-content">
                <div className="lower-dash-content-padding">
                    {/* <CategoryTasks /> */}
                    {categoriesToday == null ? null :
                        categoriesToday.map((el)=>{
                            return <CategoryTasks cat_title={el.cat_title}/>
                        }) 
                    }
                </div>
            </div>
        </div>
    )
}

export default LowerDash;