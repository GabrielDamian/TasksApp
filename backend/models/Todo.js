const mongoose = require('mongoose')

const Todo = mongoose.Schema({
    title: String,
    content: String,
    category: String,
})

module.exports = mongoose.model('Todo',Todo);