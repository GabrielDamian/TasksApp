import React,{useState, useEffect} from 'react';
import LeftBar from '../../shared-components/LeftBar/LeftBar';
import './Stats.css';
import ChartSystem from './ChartSystem';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TableStats from './TableStats';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: '150px'
    },
    selectEmpty: {

    },
  }));

const Stats = ()=>{
    const classes = useStyles();

    const [selectedPeriod, setSelectedPeriod] = useState(17);

    const [arrDaysAPI, setArrDaysAPI] = useState({
        selectedDays: null,
        arrDaysApi: null
    });
    
    
    //primul fetch default
    useEffect(async ()=>{
        fetchAPI();
    },[])


    useEffect(()=>{
        fetchAPI();
    },[selectedPeriod])

    const fetchAPI = async ()=>{
        let response = await fetch('http://localhost:4000/stats-day-picker',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                days: selectedPeriod
            })
        })
        let json_resp = await response.json();
        console.log("days 14",json_resp)
        setArrDaysAPI({
            selectedDays: selectedPeriod,
            arrDaysApi: json_resp
        });
    }
    const handleInputChange = (e)=>{
        console.log(e.target.value);
        setSelectedPeriod(e.target.value);
        console.log("INPUT:",e.target.value)
    }
    const deleteOldDay = ()=>{
        deleteFromApi()
    }
    const deleteFromApi = async ()=>{
        let response = await fetch('http://localhost:4000/delete-old-day',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: '6116f3864e7b624ceb2c0cb4'
            })
        })
        let json_resp = await response.json();
        console.log("days 14",json_resp)

    }
    return(
        <div className="dashboard-container">
            <LeftBar selected="stats"/>
            <div className="stats-container">
                <div className="stats-container-padding">
                    <span className="stats-container-title">Stats</span>
                    <ChartSystem data={arrDaysAPI}/>
                    <div className="stats-container-custom-data">
                        <div className="custom-data-date-picker">
                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedPeriod}
                                onChange={handleInputChange}
                            >
                                <MenuItem value={1}>Yesterday</MenuItem>
                                <MenuItem value={3}>Last 3 days</MenuItem>
                                <MenuItem value={7}>Last 7 days</MenuItem>
                                <MenuItem value={17}>Last 17 days</MenuItem>
                                <MenuItem value={30}>Last 30 days</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                        <div className="custom-data-date-displayer">
                            <TableStats data={arrDaysAPI} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;