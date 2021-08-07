import { CallToActionSharp } from '@material-ui/icons';
import {random_number} from '../utils/functions';
import {addTaskToCategory,removeTaskFromCategoryUtil} from '../utils/functions';

//state default necesat: {categories:{}}
function reducer(state={categories:{}},action)
{
    switch(action.type)
    {

        case 'add-category':
            let temp = state;
            if(state.categories.current_categories != undefined)
            {
                return {
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
                    categories:
                    {
                        current_categories: temp.categories.current_categories,
                        categories: [...newObjArray]
                    }
                }
            }
        default: 
            return state
    }
}

export default reducer;

