import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },

    created: {
        type: Date,
        default: new Date().toLocaleString(),
    },
})

export const todo = mongoose.model('todo', todoSchema)
