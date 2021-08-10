import {random_number} from '../utils/functions';
import {addTaskToCategory,removeTaskFromCategoryUtil} from '../utils/functions';

//state default necesar: {
//     categories:{}
//     scheduleState:{
//         state: 'empty',
//         selectedDay: 10,
//         selectedMonth: 4
//     }
//     triggerReRender:{
//       calendar: false
//}
// }

let initialState ={
    categories:{},
    scheduleState:{state: 'empty'},
    triggerReRender:{calendar:false}
}
function reducer(state=initialState,action)
{
    switch(action.type)
    {

        case 'add-category':
            let temp = state;
            if(state.categories.current_categories != undefined)
            {
                return {
                    ...state,
                    categories:
                    {
                        current_categories: temp.categories.current_categories+1,
                        categories:
                        [
                            ...temp.categories.categories,
                            {
                                id: random_number(),
                                title: action.payload.title,
                                tasks:[]
                            }    
                        ]
                    }
    
                }
            }
            else
            {
                return {
                    ...state,
                    categories:
                    {
                        current_categories: 1,
                        categories:
                        [
                            {
                                id: random_number(),
                                title: action.payload.title,
                                tasks:[]
                            }
                        ]
                    }
                }
            }
        case 'add-task-to-category':
            {
                let temp = state;
                let objArray = state.categories.categories;
                let newTask ={
                        ...action.payload
                }
                let newObjArray = addTaskToCategory(objArray,newTask)
                return {
                    ...state,
                    categories:
                    {
                        current_categories: temp.categories.current_categories,
                        categories: [...newObjArray]
                    }
                }

            }
        case 'remove-task-from-category':
            {
                let temp = state;
                let objArray = state.categories.categories;
                let oldTask ={
                        ...action.payload
                }
                //array de categorii, nu de task-uri
                let newObjArray = removeTaskFromCategoryUtil(objArray,oldTask)
                return {
                    ...state,
                    categories:
                    {
                        current_categories: temp.categories.current_categories,
                        categories: [...newObjArray]
                    }
                }
            }

        case 'change-state-empty-categories':
            return{
                ...state,
                categories:{},
                scheduleState:{
                    state: action.payload.newState,
                    selectedDay: action.payload.selectedDay,
                    selectedMonth: action.payload.selectedMonth
                }
            }
        case 'remove-category':
            let currentCategories = state.categories.categories;

            let id_to_remove = action.payload.id;
            let current_cat_number = state.categories.current_categories;

            let new_categories_arr = [];

            currentCategories.forEach((el)=>{
                if(el.id != id_to_remove)
                {
                    new_categories_arr.push(el);
                }
            })
            

            return{
                ...state,
                categories:{
                    current_categories: current_cat_number-1,
                    categories: [...new_categories_arr]
                }
            }
        default: 
            return state
    }
}

export default reducer;

