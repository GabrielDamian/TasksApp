import React,{useState,useEffect} from 'react';
import './NewCategory.css';
import InsertTask from './InsertTak';
import store from '../../../../Redux/store';
import NewTaskItem from './NewTaskItem';

const NewCategory = ({id,title})=>{

    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        store.subscribe(()=>{
            let arrayObj = store.getState().categories.categories;
            let correctObj;
            //!= undefined previne cazul in care am dat click pe alta zi si am
            //golit fortat categories din redux (newCategory inca exista si se 
            //asteapta sa gaseasca date acolo)
            if(arrayObj != undefined)
            {
                arrayObj.map((el)=>{
                    if(el.id == id)
                    {
                        correctObj = {...el}
                    }
                }) 
                if(correctObj != undefined)
                {
                    setTasks([...correctObj.tasks])
                }
            }
           
        })
    },[])

    return(
        <div className="new-category-container">
            <InsertTask catId={id} catTitle={title}/>
            <div className="new-category-items-container" id="style-5" >
                <p>{tasks.length == 0 ? null : tasks.map((el)=>{
                    return <NewTaskItem id={id} title={el.title} content={el.content} />
                })}</p>
            </div>
        </div>
    )
}

export default NewCategory;