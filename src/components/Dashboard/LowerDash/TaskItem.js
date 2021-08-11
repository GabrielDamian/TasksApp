import React from 'react';
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

const TaskItem =({usedIn,title,content})=>{
    const classes = useStyles();



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
                startIcon={<SentimentVeryDissatisfiedIcon style={{ fontSize: 15,marginLeft: '8px' }}/>}
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

export default TaskItem;