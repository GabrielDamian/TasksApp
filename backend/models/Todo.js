const mongoose = require('mongoose')

const Todo = mongoose.Schema({
    title: String,
    content: String,
    category: String,
    month: Number,
    day: Number
})

module.exports = mongoose.model('Todo',Todo);