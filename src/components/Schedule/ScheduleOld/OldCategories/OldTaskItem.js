import React,{useEffect} from 'react';
import './OldCategories.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import Popover from '@material-ui/core/Popover';
import DeleteIcon from '@material-ui/icons/Delete';

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

const OldTaskItem = ({data,fct_refetch})=>{
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
    
    const delete_from_api = async()=>{
        let response = await fetch('http://localhost:4000/remove-task',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data._id
            })
        })
        .then(res=>res.json())
        .catch((err)=>console.log(err))
        
    }
    const handleDeleteBtn = ()=>{
        console.log("click pe delete")

        delete_from_api();
        setTimeout(()=>{
            console.log("stau 1 s")
            //baza de date se updateaza mai tarziu decat se face refetch
            fct_refetch();
        },1000)
        
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
        <div className="old-task-item-container">
                <div className="old-task-item-title">
                    <h4>{shortContent(data.title)}</h4>
                </div>
                <div className="old-task-item-main-content">
                    <div className="old-task-item-main-content-text">
                        <span>{shortContent(data.content)}</span>
                    </div>
                    <div className="old-task-item-main-content-buttons">
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
                        <PopOverItem title={data.title} content={data.content}/>
                        </Popover>
                        <Button
                            onClick={handleDeleteBtn}
                            size="small"
                            variant="contained"
                            color="secondary"
                            className={classes.buttonRed}
                            startIcon={<DeleteIcon style={{ fontSize: 15,marginLeft: '8px' }}/>}
                        />
                    </div>
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

export default OldTaskItem;