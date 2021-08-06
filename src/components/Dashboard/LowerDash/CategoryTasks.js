import React from 'react';
import TaskItem from './TaskItem.js';
const CategoryTasks = ()=>{
    return(
        <div className="category-container" >
            <div className="category-title">
                <p>Node.js</p>
            </div>
            <div className="task-category-container" id="style-4">
                    <TaskItem/>
                    <TaskItem/>
                    <TaskItem/>
                    <TaskItem/>
                    <TaskItem/>
                    <TaskItem/>
                    <TaskItem/>
                    <TaskItem/>
            </div>
        </div>
    )
}

export default CategoryTasks;