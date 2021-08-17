import React ,{useState,useEffect} from 'react';
import TaskItem from './TaskItem.js';
const CategoryTasks = ({cat_title,tasks,refetch_api})=>{

    useEffect(()=>{
        console.log("cat_tile",cat_title)
        console.log("taks",tasks)
    })
    return(
        <div className="category-container" >
            <div className="category-title">
                <p>{cat_title}</p>
            </div>
            <div className="task-category-container" id="style-4">
                {
                    tasks.map((el_task)=>{
                        return(
                            <TaskItem refetch_api={refetch_api} data_task={el_task}/>
                        )
                    })
                }
                   

            </div>
        </div>
    )
}

export default CategoryTasks;