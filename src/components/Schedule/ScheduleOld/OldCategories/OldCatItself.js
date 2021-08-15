import React from 'react';
import './OldCategories.css';
import OldTaskItem from './OldTaskItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {backEndApi} from '../../../../apiLinks';

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

const OldCatItself = ({cat_name,tasks,fct_refetch})=>{
    
    const classes = useStyles();

    const apiDeleteCat = async()=>{
        let response = await fetch(`${backEndApi}/remove-entire-category`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cat_name: cat_name
            })
        })
    }
    const handleDeleteEntireCat = ()=>{
        apiDeleteCat();
        setTimeout(()=>{
            fct_refetch();
        },1000)
    }
    const shortContent = (text)=>{
        if(text.length >= 20)
        {
            //returneaza un substring din text cu primele 24 caractere + "..."
            let tempString = text.substring(0,15);
            return tempString+' ...'
        }
        else
        {
            return text;
        }
    }
    return(
        <div className="old-cat-itself-container">
            <div className="old-cat-itself-cont-padding">
                <div className="old-cat-title">
                    <div className="old-cat-title-single">
                        <span title={cat_name}>{shortContent(cat_name)}</span>
                    </div>
                    <div className="old-cat-title-remove-cat-btn" title="remove category">
                        {/* <button onClick={handleDeleteEntireCat}>Delete cat</button> */}
                        <Button
                            onClick={handleDeleteEntireCat}
                            variant="contained"
                            color="secondary"
                            className={classes.deleteCat}
                            startIcon={<HighlightOffIcon style={{marginLeft:'12px', height:'12px' }}/>}
                        />
                    </div>
                </div>
                <div className="old-cat-content-tasks" id="style-6">
                    {tasks.map((task)=>{
                        return <OldTaskItem data={task} fct_refetch={fct_refetch}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default OldCatItself;
