import store from './store';

export function addCategory (input)
{
    store.dispatch({
        type: 'add-category',
        payload:{
            title: input
        }
    })
}
export function addTaskToCategory(input)
{
    store.dispatch({
        type:'add-task-to-category',
        payload:{
            catId:input.catId,
            taskTitle: input.taskTitle,
            taskContent: input.taskContent
        }
    })
}
export function removeTaskFromCategory(input)
{
    store.dispatch({
        type: 'remove-task-from-category',
        payload:{
            ...input
        }
    })
}