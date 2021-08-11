const mongoose = require('mongoose')

const Day = mongoose.Schema({
    day_nr: Number,
    month_nr: Number,
    totalTasks: Number,
    workedMinutes: Number,
    completedTask: Number,
    failedTasks: Number,
    uncompletedTasks:Number
})

module.exports = mongoose.model('Day',Day);