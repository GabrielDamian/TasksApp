import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import {backEndApi} from '../../../apiLinks';

const useStyles = makeStyles((theme) => ({
    buttonRed: {
      margin: '0px',
      height: '20px',
      padding: '0px',
      minWidth: '35px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '10px'
    },
    buttonBlue: {
        margin: '0px',
        height: '20px',
        padding: '0px',
        minWidth: '35px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px',
        backgroundColor: '#64b5f6'
      }
      ,
    checkedButton: 
    {
        margin: '0px',
        height: '20px',
        padding: '0px',
        minWidth: '35px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        marginRight: '18px'
    }
}));

const TaskItem =({refetch_api,data_task})=>{
    const classes = useStyles();

    useEffect(()=>{
        console.log("in tasks", data_task)
    },[])
    const handleFailedTask = async ()=>{
        let response_remove = await fetch(`${backEndApi}/remove-task`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data_task._id
            })
        })
        //dam timp lui db sa se updateze
        setTimeout(()=>{
            refetch_api()
        },2000)

        let response = await fetch(`${backEndApi}/increment-today-data`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data_inc: 'failedTasks'
            })
        })

        setTimeout(()=>{
            refetch_api()
        },2000)
    }

    const handleCompletedTask = async()=>{
        let response_remove = await fetch(`${backEndApi}/remove-task`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data_task._id
            })
        })
        let response_increment_completed = await fetch(`${backEndApi}/increment-today-data`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data_inc: 'completedTask'
            })
        })
        setTimeout(()=>{
            refetch_api()
        },2000)
}
    return(
        <div className="task-item-container">
            <div className="task-item-main-title">
                <span>{data_task.title}</span>
            </div>
            <div className="task-item-container-content">
                <span>
                    {data_task.content}
                </span>
            </div>
            <div className="task-item-control-button">
            {/* <Button
                size="small"
                variant="contained"
                color="secondary"
                className={classes.buttonBlue}
                startIcon={<MoreHorizSharpIcon style={{ fontSize: 15,marginLeft: '9px' }}/>}
            /> */}
            <Button
                onClick={handleFailedTask}
                size="small"
                variant="contained"
                color="secondary"
                className={classes.buttonRed}
                startIcon={<SentimentVeryDissatisfiedIcon style={{ fontSize: 15,marginLeft: '8px' }}/>}
            />
            <Button
                onClick={handleCompletedTask}
                size="small"
                variant="contained"
                color="secondary"
                className={classes.checkedButton}
                startIcon={<CheckSharpIcon style={{ fontSize: 15,marginLeft: '10px'}}/>}
            />
            </div>
        </div>
    )
}

export default TaskItem;