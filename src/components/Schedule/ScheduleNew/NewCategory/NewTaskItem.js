import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import {removeTaskFromCategory} from '../../../../Redux/actions';
import Popover from '@material-ui/core/Popover';

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

    //pop-over
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id_popover = open ? 'simple-popover' : undefined;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // * pop-over finished

    const handleDelete = ()=>{
        //go redux => id cat =>remove task from array based on title and content
        removeTaskFromCategory({
            id:id,
            title: title,
            content: content
        })
    }
    const shortContent = (text)=>{
        if(text.length >= 24)
        {
            //returneaza un substring din text cu primele 24 caractere + "..."
            let tempString = text.substring(0,23);
            return tempString+' ...'
        }
        else
        {
            return text;
        }
    }
    return(
        <div className="task-item-container">
            <div className="task-item-main-title">
                <span>{shortContent(title)}</span>
            </div>
            <div className="task-item-container-content">
                <span>
                    {shortContent(content)}
                </span>
            </div>
            <div className="task-item-control-button">
            <Button
                onClick={handleClick}
                size="small"
                variant="contained"
                color="secondary"
                className={classes.buttonBlue}
                startIcon={<MoreHorizSharpIcon style={{ fontSize: 15,marginLeft: '9px' }}/>}
            />
            <Popover
                id={id_popover}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <PopOverItem title={title} content={content}/>

            </Popover>
            <Button
                size="small"
                variant="contained"
                color="secondary"
                className={classes.buttonRed}
                onClick={handleDelete}
                startIcon={<DeleteIcon style={{ fontSize: 15,marginLeft: '8px' }}/>}
            />

            </div>
        </div>
    )
}

const PopOverItem = ({title, content})=>
{
    return(
        <div className="pop-over-container">
            <h4>{title}</h4>
            <span>{content}</span>
        </div>
    )
}
export default NewTaskItem;