import React,{useState, useEffect} from 'react';
import './OldCategories.css';
import OldCatItself from './OldCatItself';

const OldCategories = ({arr_data,fct_refetch})=>{

    const [tasks, setTasks] = useState(arr_data);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        console.log("level 2, arr_data", arr_data)
        if(arr_data.length != 0)
        {
            setTasks(arr_data)
        }
        else
        {
            console.log("reload")
            window.location.reload();
            return
        }
    },[arr_data])

    useEffect(()=>{
        //useEffect care de fiecare data cand tasks se modifica, creeaza in categories, array de task-uri filtrate dupa categorie
        let categories_name_total = [];
        arr_data.forEach((el)=>{
            categories_name_total.push(el.category)
        })
        let uniques_categories = [...new Set(categories_name_total)];
        let content_cat = []

        uniques_categories.forEach((el)=>{
            let this_cat_tasks = [];
            arr_data.forEach((task)=>{
                if(task.category == el)
                {
                    this_cat_tasks.push(task)
                }
            })
            
            let final_obj = {
                cat_name: el,
                tasks: this_cat_tasks
            }
            content_cat.push(final_obj)
        })

        setCategories(content_cat)
    },[tasks])
    return (
        <>
        {categories.map((el)=>{
            return <OldCatItself cat_name={el.cat_name} tasks={el.tasks} fct_refetch={fct_refetch}/>
        })}
        </>
    )
}

export default OldCategories;