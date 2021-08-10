import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {theme_1} from './ScheduleNew';
import { addCategory} from '../../../Redux/actions';
import { createTheme } from '@material-ui/core/styles';

const theme_2 = createTheme({
    palette: {
      primary: {
        light: '#d0cdfe',
        main: '#a29bfe',
        dark: '#7268fd',
        contrastText: '#fff',
      },
    },
  });

const useStyles = makeStyles((theme) => ({
    exitModalButton: {
        margin: 0,
        padding: 0,
        height: '30px',
        minWidth: '40px',
        margin: '5px',
        float: 'right'
    },
    saveModalButton:
    {
        margin: 0,
        padding: 0,
        marginTop: '10px',
    }
  }));

  
const ModalComp = ({closeModal})=>{
    const classes = useStyles();

    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const handleInputChange =(e)=>{
        setError(false);
        setInput(e.target.value);
        
    }
    const saveModal = ()=>{
        if(input == '')
        {
            setError(true)
        }
        else
        {
            addCategory(input);
            closeModal()
        }
    }
    return(
        <div className="modal-container">
            <div className="modal-content-center">
                <div className="exit-modal">
                        <Button 
                            className={classes.exitModalButton}
                            onClick={closeModal} 
                            variant="contained"
                            color="secondary"
                            startIcon={<ExitToAppIcon style={{
                                fontSize: 18,
                                margin: 0,
                                padding: 0,
                                marginLeft: '7px',
                                }}/>}
                            >
                        </Button>
                </div>
                <div className="modal-content-main">
                    <TextField 
                        error={error}
                        id="standard-basic" 
                        label="Category title" 
                        style={{marginLeft:'20px'}}
                        value={input}
                        onChange={handleInputChange}
                    />
                    <ThemeProvider theme={theme_2}>
                        <Button 
                            className={classes.saveModalButton}
                            onClick={saveModal} 
                            variant="contained"
                            color="primary"
                            >
                            <span className="save-text-modal">Save</span>
                        </Button>
                    </ThemeProvider>
                    
                </div>
            </div>
        </div>
    )
}

export default ModalComp;
