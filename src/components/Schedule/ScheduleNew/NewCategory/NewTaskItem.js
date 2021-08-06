import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import {removeTaskFromCategory} from '../../../../Redux/actions';


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

const NewTaskItem =({id,title,content})=>{
    const classes = useStyles();

    const handleDelete = ()=>{
        //go redux => id cat =>remove task from array based on title and content
        removeTaskFromCategory({
            id:id,
            title: title,
            content: content
        })
    }
    return(
        <div className="task-item-container">
            <div className="task-item-main-title">
                <span>{title}</span>
            </div>
            <div className="task-item-container-content">
                <span>
                    {content}
                </span>
            </div>
            <div className="task-item-control-button">
            <Button
                size="small"
                variant="contained"
                color="secondary"
                className={classes.buttonBlue}
                startIcon={<MoreHorizSharpIcon style={{ fontSize: 15,marginLeft: '9px' }}/>}
            />
            <Button
                size="small"
                variant="contained"
                color="secondary"
                className={classes.buttonRed}
                onClick={handleDelete}
                startIcon={<DeleteIcon style={{ fontSize: 15,marginLeft: '8px' }}/>}
            />
            <Button
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

export default NewTaskItem;