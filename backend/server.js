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
            console.log("Todo create cu succes")
            res.json(req.body)
        })
        .catch((err)=>{
            res.status(500).send(err.message)
        })
})





app.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`);
})
