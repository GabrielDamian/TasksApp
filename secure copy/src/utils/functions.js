export const random_number = ()=>{
    let random = Math.random()*1000; //[0-1]
    return Math.floor(random)
}
//objArray = vector de categori (1 cat = 1 obiect)
export const addTaskToCategory = (objArray, newTask)=>{
    let newObjArray = objArray.map((el)=>{
        if(el.id == newTask.catId)
        {
            el.tasks.push({
                title: newTask.taskTitle,
                content: newTask.taskContent
            })
        }
        return el
    })
    return newObjArray;
}


export const removeTaskFromCategoryUtil = (objArray, oldTask)=>{
    console.log("Array obj in remove:",objArray)
    console.log("OldTasK:", oldTask)
    let correctObjCat;

    objArray.map((el)=>{
        if(el.id == oldTask.id)
        {
            correctObjCat = {...el}
        }
    })
    console.log("FAc remove din cat:",correctObjCat)
    let vectorTasks = [...correctObjCat.tasks];
    let newTasksVector = vectorTasks.filter((obj)=>{
        if(obj.title != oldTask.title && obj.content != oldTask.content)
        {
            return true
        }
        else
        {
            return false;
        }
    })
    let finalCatArray = objArray.map((el)=>{
        if(el.id == oldTask.id)
        {
            el.tasks = [...newTasksVector]
            return el
        }
        else
        {
            return el
        }
    })
    return finalCatArray
}   