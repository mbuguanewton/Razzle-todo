import { todo } from '../models/Todo'
import { Router } from 'express'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body

        const newTodo = new todo({
            ...data,
        })

        const addedTodo = await newTodo.save()

        return res
            .status(201)
            .json({ todo: addedTodo, message: 'new todo created' })
    } catch (error) {
        return res.status(400).json({
            message: `something went wrong, ${error.message}`,
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const todos = await todo.find({}).sort({ created: 'asc' })
        return res.status(200).json(todos)
    } catch (error) {
        return res.status(400).json({
            message: `something went wrong, ${error.message}`,
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const update = req.body

        const updated = await todo.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        return res.json({ todo: updated, message: 'todo update' })
    } catch (error) {
        return res.status(400).json({
            message: `something went wrong, ${error.message}`,
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await todo.findByIdAndDelete(id)

        return res.json({ todo: deleted, message: 'todo deleted' })
    } catch (error) {
        return res.status(400).json({
            message: `something went wrong, ${error.message}`,
        })
    }
})

export const todoRouter = router
