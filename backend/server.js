const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000;
const Todo = require('./models/Todo');
const Day = require('./models/Day');

mongoose.connect('mongodb://127.0.0.1:27017/todo-app',{useNewUrlParser: true});
mongoose.connection.once('open',()=>{
    console.log("Mongodb connection established successfully");
})

const app = express();
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("working")
})

// '/all-todos' -  return all content from Todo document type from db
app.get('/all-todos',(req,res)=>{
    Todo.find((err,todos)=>{
        if(err){
            console.log(err)
            res.status(404).send("Error")
        }
        else{
            res.json(todos);
        }
    })
})

// '/create-todo' - post todo
app.post('/create-todo',(req,res)=>{
    console.log("BODY:")
    console.log(req.body);
    const newTodo = new Todo(req.body);
    newTodo
        .save()
        .then((todo)=>{
            console.log("Todo created with succes")
            res.json(req.body)
        })
        .catch((err)=>{
            res.status(500).send(err.message)
        })
})
app.post('/checked-days-in-month',(req,res)=>{
    
    //luna in care trebuie scoase datele in ale caror zile exista cel putin un todo
    let month = req.body.month;

    //vector care contine datele (duplicate daca exista mai mult todos in aceeasi zi)
    let todos_in_month = []

    Todo.find((err,todos)=>{
        if(err){
            console.log(err)
            res.status(404).send("Error")
        }
        else
        {
            todos.forEach((el)=>{
                if(el.month == month)
                {
                todos_in_month.push(el.day)
                }
            })
            //vrem vector unic care contine zilele din luna primita in care exista cel putin un todo setat
            let todos_in_month_uniques = [...new Set(todos_in_month)]
            res.json(todos_in_month_uniques)
        } 
       
    })
    
})


app.post('/post-new-tasks',(req,res)=>{
    let day = req.body.day;
    let month = req.body.month;
    let categories = req.body.tasks;
    
    categories.forEach((el)=>{

        let category_title = el.title;

        let tasks_arr = el.tasks;

        tasks_arr.forEach((task_el)=>{

            let newTodo =  new Todo({
                title: task_el.title,
                content: task_el.content,
                category: category_title,
                month: month,
                day: day
            });
            newTodo
                .save()
                .catch((err)=>{
                    res.status(500).send(err.message)
                })
        })
    })
    res.json({ceva:'ceva'})
})


app.post('/info-old-day',(req,res)=>{
    let day = req.body.day;
    let month = req.body.month;
    let res_arr = []
    Todo.find((err,todos)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("eroare");
        }
        else
        {
            todos.forEach((el)=>{
                if(el.day == day && el.month == month)
                {
                    res_arr.push(el);
                }
            })
            res.json(res_arr);
        }
    })
})
app.post('/remove-task', (req,res)=>{
    let id_req= req.body.id;
    Todo.findOneAndDelete({_id: id_req}, function(err){
        if(err){
            console.log(err)
            res.status(500).json({res:"failed"})
        }
        else
        {
            res.json({res:"succes"})
        }
    })
})
app.post('/remove-entire-category',(req,res)=>{
    let category_name = req.body.cat_name;
    Todo.deleteMany({category: category_name})
    .then(()=>{
        res.send({succes: "true"})
    })
    .catch((err)=>{
        console.log(err);
    })

})

//check is one day is empty (if at least one task exists in that day)
app.post('/check-empty-day', (req,res)=>{
    let day = req.body.day;
    let month = req.body.month;

    Todo.find((err,todos)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("eroare");
        }
        else
        {
            let boolean = false;
            todos.forEach((el)=>{
                if(el.day == day && el.month == month)
                {
                    boolean =true;
                }
            })
            res.json({
                contentExist: boolean
            })
        }
    })
})
app.post('/check-day-info', async (req,res)=>{
//daca ziua nu exista, o creez
//daca ziua exista, doar intorc datele existente

    let day_nr = req.body.day_nr;
    let month_nr = req.body.month_nr;
    
    //arr care contine cel mult o zi care are day si month cu cele de astazi
    let today_day = await Day.find({
        day_nr: day_nr,
        month_nr: month_nr,
    })

    if(today_day.length == 0)
    {
        //ziua nu exista, trebuie creeata
        console.log("creez zi noua !")

        //cate task-uri sunt setate in aceasta zi, vector
        let promise_counter = await Todo.find({day: day_nr, month: month_nr});

        //*uncompletedTasks are default nr total de task-uri, urmand sa se decrementeze pe 
        //masura ce sunt finalizate task-urile din lowerDash
        let new_day = Day({
            day_nr: day_nr,
            month_nr: month_nr,
            totalTasks: promise_counter.length,
            workedMinutes: 0,
            completedTask: 0,
            failedTasks: 0,
            uncompletedTasks: promise_counter.length
        })

        new_day
            .save()
            .then((new_created_day)=>{res.json(new_created_day)})
            .catch((err)=>{console.log(err)})
        }
    else
    {
        console.log("ziua exista deja, doar o intorc!")
        res.json(today_day[0])
    }
})

app.post('/increment-today-data',async (req,res)=>{
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    
    let find_response = await Day.find({day_nr: day, month_nr:month})
    if(find_response.length == 0)
    {
        res.status(500).json({error: true})
    }
    else
    {
        let data_to_increment = req.body.data_inc;
        let today_old_obj = find_response[0];
        switch(data_to_increment)
        {
            case 'failedTasks':
                console.log("increment failedTasks")
                let old_data_failed = today_old_obj.failedTasks;
                let update_now_failed = await Day.findOneAndUpdate({day_nr: day, month_nr:month},{failedTasks:old_data_failed+1})
                res.json(update_now_failed);
                break
            case 'completedTask':
                console.log("increment completedTask")
                let old_data_completed = today_old_obj.completedTask;
                let update_now_completed = await Day.findOneAndUpdate({day_nr: day, month_nr:month},{completedTask:old_data_completed+1})
                res.json(update_now_completed);
                break
            case 'workedMinutes':
                //un increment aici inseamna 10 secunde contorizate de switch
                console.log("increment workedMinutes")
                let old_data_timer = today_old_obj.workedMinutes;
                let update_now_timer = await Day.findOneAndUpdate({day_nr: day, month_nr:month},{workedMinutes:old_data_timer+1})
                res.json(update_now_timer);
                break
            default:
                return
        }
        
        // let
        // let taks_found = find_response[0];
        // let old_failed_nr = taks_found.failedTasks;
        // let update_now = await Day.findOneAndUpdate({day_nr: day, month_nr:month},{failedTasks:old_failed_nr+1})
        // res.json(update_now);
    }
})


app.post('/stats-day-picker',async (req,res)=>{
    let days = req.body.days;
    console.log("asdas",days)
    let exact_month_width = [31,28,28,30,30,27,31,31,30,31,30,31];
    
    let temp_date = new Date();
    let today_day = temp_date.getDate();
    let today_month = temp_date.getMonth();
    
    if(days == 1)
    {
        console.log("CASE 1");
        let day_to_find =null;
        let month_to_find = null;
        if(today_day == 1)
        {
            day_to_find = exact_month_width[today_month-1];
            month_to_find = today_month -1;
            console.log("sunt pe 1' of the mont, caut pe:", day_to_find)
        }
        else
        {
            day_to_find = today_day -1;
            month_to_find = today_month;
        }
        //caut atat ieri cat si azi
        let yesteday_arr = await Day.find({
            $or: [
                {
                    month_nr: month_to_find,
                    day_nr: day_to_find
            },
                {
                    month_nr: today_month,
                    day_nr: today_day
            }
    ]
        })


        console.log("/yesterday_arr", yesteday_arr);
        res.json({
            arr_days: [...yesteday_arr]
        })
    }
    else 
    {
        //mai multe zile

        
        //toate zilele cerute sunt din luna curenta
        if(days < today_day)
        {
            console.log("CASE 2");
            let temp_date = new Date();
            let today_day = temp_date.getDate();
            let today_month = temp_date.getMonth();
            
            let start_date = today_day - days;
            let arr_conditii = [];


            for(let i=start_date;i<=today_day;i++)
            {
                let temp_obj = {
                    month_nr: today_month,
                    day_nr: i
                }
                arr_conditii.push({...temp_obj})
            }
            console.log("arr conditii", arr_conditii)
            let date_filtrate = await Day.find({
                $or:[...arr_conditii]
            })
            console.log("zile din luna curenta", date_filtrate)
            res.json({pola: 'pola'})
        }
        else
        {
            console.log("CASE 3");
            //luna trecuta + luna curenta
            let temp_date = new Date();
            let today_day = temp_date.getDate();
            let today_month = temp_date.getMonth();

            let zile_din_luna_trecuta = days-today_day;

            let arr_conditii = []


            //prelucrare luna trecuta
            let max_zile_luna_trecuta = exact_month_width[today_month-1];
            for(let j=max_zile_luna_trecuta - zile_din_luna_trecuta; j<=max_zile_luna_trecuta;j++)
            {
                let temp_obj = {
                    month_nr: today_month-1,
                    day_nr: j
                }
                arr_conditii.push(temp_obj)
            }
            
            //prelucrat luna curenta
            for(let i=0;i<=today_day;i++)
            {
                let temp_obj = {
                    month_nr: today_month,
                    day_nr: i
                }
                arr_conditii.push(temp_obj)
            }


            console.log("arr conditii", arr_conditii)
            let date_filtrate = await Day.find({
                $or:[...arr_conditii]
            })


            let date_filtrate_crescator = [];
            date_filtrate.forEach((el)=>{
                if(el.month_nr == today_month -1)
                {
                    date_filtrate_crescator.push(el);
                }    
            })
            date_filtrate.forEach((el)=>{
                if(el.month_nr == today_month)
                {
                    date_filtrate_crescator.push(el);
                }    
            })

            console.log("zile din luna trecuta_curenta", date_filtrate_crescator)
            res.json({
                arr_crescator: date_filtrate_crescator
            })
            
        }
    }
    //res.json({pola: 'pola'})
})

app.post('/insert_old_day', (req,res)=>{
    let day = req.body.day;

    let temp_date = new Date();

    let newDay = new Day({
        day_nr: day,
        month_nr: temp_date.getMonth()-1,
        totalTasks: 2324,
        workedMinutes: 3,
        completedTask: 3,
        failedTasks: 2,
        uncompletedTasks:5
    })

    newDay
            .save()
            .then((new_created_day)=>{res.json(new_created_day)})
            .catch((err)=>{console.log(err)})
})
app.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`);
})
