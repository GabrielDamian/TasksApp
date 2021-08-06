import React,{useState} from 'react';
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

const SwitchButton = ()=>{
    const [checked, setChecked] = useState(false);

    const handleChange = ()=>{
        setChecked(prevState =>!prevState)
    }
    return(
       <div className="switch-button-contaier">
        <ThemeProvider theme={theme}>
            <Switch
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