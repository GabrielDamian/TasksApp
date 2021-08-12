import React, {useState,useEffect} from 'react';
import './ScheduleNew.css';
import store from '../../../Redux/store';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/Save';
import NewCategory from './NewCategory/NewCategory';
import Modal from '@material-ui/core/Modal';
import ModalComp from './ModalComp';
import {changeStateEmptyCategories,} from '../../../Redux/actions';

const theme_1 = createTheme({
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
    buttonAddCategory: {
        margin: 0,
        padding: 0,
        height: '80%',
        width: '90px',
        fontSize: '0.7em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-center',
        marginRight: '10px',
        padding: '0px 52px',

    },
  }));
const ScheduleNew = ()=>
{
    const classes = useStyles();

    const [dayInThePast, setDayInThePast] = useState(false);


    //show indicator = true daca nu este nicio categorie pentru ziua x
    const [showIndicator, setShowIndicator] = useState({
        show: true,
        text: '*This day is empty, add new category first'
    });
    

    //categories care ca default necesar, null
    const [categories, setCategories] = useState(null);
    const [modal, setModal] = useState(false);
    const handleModalChange = ()=>{
        setModal((prev)=>!prev)
    }
    const handleModalClose = ()=>{
        setModal(false)
    }
    useEffect(()=>{
        //functie de subscrube
        store.subscribe(()=>{
            functionalitateSetareTrecutPrezent()
        })

        //functie care executa pe loc
        functionalitateSetareTrecutPrezent()
       
    },[])



    const functionalitateSetareTrecutPrezent = ()=>{
        let date = new Date();
        let today_day = date.getDate();
        let today_month= date.getMonth();

        let store_redux = store.getState();
        let redux_day = store_redux.scheduleState.selectedDay;
        let redux_month = store_redux.scheduleState.selectedMonth;
        if(redux_month < today_month)
        {
            console.log("Luna trecuta!")
            setDayInThePast(true);
        }
        else if(redux_month == today_month && redux_day <= today_day)
        {
            console.log("Luna curenta, dar zi din trecut!")
            setDayInThePast(true);
        }
        else if(redux_month == today_month && redux_day > today_day)
        {
            console.log("luna curnata, zi din viitor")
            setDayInThePast(false);
        }
        else if(redux_month > today_month)
        {
            console.log("luna viitoare!")
            setDayInThePast(false);
        }
    }


    useEffect(()=>{
        store.subscribe(()=>{
            let data = store.getState();
            let categoriesRedux = store.getState().categories.categories;
            if(categoriesRedux == undefined )
            {
                setCategories(null)
            } 
            else
            {
                setCategories(categoriesRedux)
            }
            
        })
    },[])

    //setDayInThePast



    useEffect(()=>{
        if(categories != null)
        {
            setShowIndicator({
                show: false,
                text: '*This day is empty, add new category first'
            });
        }
        else
        {
            setShowIndicator({
                show: true,
                text: '*This day is empty, add new category first'
            });
        }
    },[categories])
    
    const checkCategoriesBeforeSave = ()=>{
        if(categories != undefined)
        {
            for(let x in categories)
            {
                let temp_arr = categories[x].tasks;
                if(temp_arr.length == 0)
                {
                    return false
                }
            }
            return true;
        }        
        return false;
    }
    const handleSaveDay = ()=>{
        //inainte de a face POST, verifica ca:1) categories != null, fiecare categories sa aiba cel putin un task

        if(checkCategoriesBeforeSave())
        {
            asyncPOST();
            window.location.reload();
        }
        else
        {
            console.log("Each category should have at least one task")
            setShowIndicator({
                show: true,
                text: 'Each category should have at least one task.'
            })
        }
    }
    const asyncPOST = async()=>{
        // console.log("TEST:",categories)
        // console.log("day",store.getState().scheduleState.selectedDay)
        // console.log("month",store.getState().scheduleState.selectedMonth)

        let response = await fetch('http://localhost:4000/post-new-tasks',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tasks: categories,
                day: store.getState().scheduleState.selectedDay,
                month: store.getState().scheduleState.selectedMonth
            })
        }
            
        )
    }
    return(
       <div className="schedulenew-container">
           <div className="schedulenew-container-padding">
               <div className="schedulenew-container-title-tab">
                   <div className="schedulenew-title-indication">
                        {showIndicator.show ? 
                        <span>{showIndicator.text}</span>
                            :
                        null
                    }
                   </div>
                   <div className="schedule-new-title-button">
                   <ThemeProvider theme={theme_1}>
                    <Button
                            variant="contained"
                            color="primary"
                            className={classes.buttonAddCategory}
                            startIcon={<AddIcon style={{
                                fontSize: 18,
                                margin: 0,
                                padding: 0,
                                marginLeft: '4px'
                                }}/>}
                            onClick={handleModalChange}
                        >
                            Category
                        </Button>
                        <Button
                            onClick={handleSaveDay}
                            variant="contained"
                            color="primary"
                            className={classes.buttonAddCategory}
                            startIcon={<SaveIcon style={{
                                fontSize: 18,
                                margin: 0,
                                padding: 0,
                                marginLeft: '4px'
                                }}/>}
                        >
                            Save
                        </Button>
                    </ThemeProvider>
                   </div>
               </div>
               <div className="schedulenew-categoryes-container">
                    {/*These will be rendered dinamically using map */}
                    {categories == null ? null : categories.map((currentObj)=>{
                        return <NewCategory 
                                    title={currentObj.title}
                                    id={currentObj.id} 
                                />
                    })}
               </div>
                <Modal
                        open={modal}
                        onClose={handleModalClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                            <ModalComp closeModal={handleModalClose}/>
                    </Modal>
           </div>

       </div>
    )
}
export default ScheduleNew;