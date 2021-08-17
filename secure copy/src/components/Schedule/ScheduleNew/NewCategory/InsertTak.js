import React,{useState} from 'react';
import './NewCategory.css';
import {addTaskToCategory,removeCategory} from '../../../../Redux/actions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    deleteCat: {
        margin: '0px',
        padding: '0px',
        height: '17px',
        width: '26px',
        minWidth: '20px',
        fontSize: '0.6rem'
    },
  }));

const InsertTask = ({catId, catTitle})=>{

    const [taskTitle, setTaskTitle] = useState('');
    const [taskContent, setTaskContent] = useState('');

    const classes = useStyles();

    const handleInputChange = (e)=>{
        switch(e.target.name)
        {
            case 'title':
                setTaskTitle(e.target.value);
                break;
            case 'content':
                setTaskContent(e.target.value);
            default:
        }
    }
    const handleTaskSave = ()=>{
        if(taskTitle !== '' && taskContent !== '')
        {
            addTaskToCategory({
                catId: catId,
                taskTitle: taskTitle,
                taskContent: taskContent,
            })
            setTaskTitle('')
            setTaskContent('')
            
        }
        
    }
    const handleRemoveCategory = ()=>{
        removeCategory(catId);
    }
    return(
        <div className="insert-task-container">
            <div className="insert-taks-cat-title">
                    <div className="insert-taks-cat-title-itself">
                        <p>{catTitle}</p>
                    </div>
                    <div className="insert-taks-cat-remove-cat-btn">
                        <Button
                            onClick={handleRemoveCategory}
                            variant="contained"
                            color="secondary"
                            className={classes.deleteCat}
                            startIcon={<HighlightOffIcon style={{marginLeft:'12px', height:'12px' }}/>}
                        />
                    </div>
                    
            </div>
            <div className="insert-task-task-input">
                <div className="insert-taks-inputs">
                    <input 
                        id="task-title" 
                        type="text" 
                        placeholder="Task title" 
                        name="title"
                        onChange={handleInputChange}
                        value={taskTitle}
                        
                        >
                    </input>
                    <textarea 
                        id="task-content" 
                        rows="2" 
                        placeholder="Task content" 
                        name="content"
                        onChange={handleInputChange}
                        value={taskContent}
                    >
                    </textarea>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    // className={classes.buttonAddCategory}
                    style={{width: '40%',marginBottom: '4px'}}
                    onClick={handleTaskSave}
                >
                    Save
                </Button>

            </div>
        </div>
    )
}
export default InsertTask;