import React,{useEffect, useState} from 'react';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { purple } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
      secondary: {
        main: '#a19ef8',
        light: '#a19ef8',
        dark: '#a19ef8'
      },
    },
  });

const SwitchButton = ({refetch_api})=>{
    const [checked, setChecked] = useState(false);
    const handleChange = ()=>{
        setChecked(prevState =>!prevState)
    }
    const handkeBtnClick = ()=>{
      console.log("click switch!")
    }

    useEffect(()=>{
      
      let temp_interval = setInterval(()=>{
        if(checked == true)
        {
          console.log("adaug 10 sec in db");
          incrementTimerApi();
          setTimeout(()=>{
            refetch_api();
          },2000)
        }

      },10000)

      return(()=>{
        clearInterval(temp_interval);
      })
    })
    const incrementTimerApi = async ()=>
    {
      let response = await fetch('http://localhost:4000/increment-today-data',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data_inc: 'workedMinutes'
        })
    })

    }
    return(
       <div className="switch-button-contaier">
        <ThemeProvider theme={theme}>
            <Switch
                onClick={handkeBtnClick}
                color="secondary"
                checked={checked}
                onChange={handleChange}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </ThemeProvider>

        <span>{checked ? 'Working' : 'Pause'}</span>
       </div>
    )
}

export default SwitchButton;