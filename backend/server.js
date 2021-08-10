const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000;
const Todo = require('./models/Todo');

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
app.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`);
})
