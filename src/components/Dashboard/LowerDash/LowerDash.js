import React,{useState,useEffect} from 'react';
import './LowerDash.css';
import SwitchButton from './SwitchButton';
import CategoryTasks from './CategoryTasks';
import {backEndApi} from '../../../apiLinks';

const LowerDash = ({refetch_api,upperDashData})=>{

    const [categoriesToday, setCategoriesToday] = useState(null);
    // [
    //     {
    //         cat_name: 'ceva',
    //         tasks: [{
    //             title: 'aadas',
    //             content: 'r4tvrgr'
    //         }]
    //     }
    // ]

    useEffect(()=>{
        console.log("pola")
        getCategoriesApi();
    },[])
    useEffect(()=>{

        getCategoriesApi();
    },[upperDashData])

    const getCategoriesApi =async ()=>
    {
        let date = new Date();
        let day_nr = date.getDate();
        let month_nr = date.getMonth();

        let response = await fetch(`${backEndApi}/info-old-day`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: day_nr,
                month: month_nr
            })
        })
        let res_json = await response.json();
        prelucreazaTaskuriFromApi(res_json);
    }
    let prelucreazaTaskuriFromApi = (arr_api)=>{
        let categorii_duplicate = [];
        
        arr_api.forEach((el)=>{
            categorii_duplicate.push(el.category);
        })
        let categorii_unice = [...new Set(categorii_duplicate)];
        let final_data = []
        categorii_unice.forEach((cat_name)=>{
            let cat_obj = {};
            cat_obj["cat_name"] = cat_name;
            let tasks = [];
            arr_api.forEach((task_el)=>{
                if(task_el.category == cat_name)
                {
                    tasks.push(task_el);
                }
            })
            cat_obj["tasks"] = tasks;
            final_data.push(cat_obj)
        })

        setCategoriesToday(final_data);
    }
    return (
        <div className="lower-dash-container">
            <div className="task-intro">
                <span>Tasks</span>
                <SwitchButton refetch_api={refetch_api}/>
            </div>
            <div className="lower-dash-content">
                <div className="lower-dash-content-padding">
                    {/* <CategoryTasks /> */}
                    {categoriesToday == null ? null :
                        categoriesToday.map((el)=>{
                            return <CategoryTasks cat_title={el.cat_name} tasks={el.tasks} refetch_api={refetch_api}/>
                        }) 
                    }
                </div>
            </div>
        </div>
    )
}

export default LowerDash;