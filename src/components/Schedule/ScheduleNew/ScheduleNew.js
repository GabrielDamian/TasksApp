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

export const theme_1 = createTheme({
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
    //show indicator = true daca nu este nicio categorie pentru ziua x
    const [showIndicator, setShowIndicator] = useState(true);

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
        store.subscribe(()=>{
            let data = store.getState();
            let categoriesRedux = store.getState().categories.categories;
            if(categoriesRedux.length == 0)
            {
                setCategories(null)
            } 
            else
            {
                setCategories(categoriesRedux)
            }
            
        })
    },[])
    return(
       <div className="schedulenew-container">
           <div className="schedulenew-container-padding">
               <div className="schedulenew-container-title-tab">
                   <div className="schedulenew-title-indication">
                        {showIndicator ? 
                        <span>*This day is empty, add new category first</span>
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