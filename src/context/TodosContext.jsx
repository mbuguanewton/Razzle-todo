import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'

const TodoContext = createContext({})

function TodoProvider({ children }) {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState(null)

    async function addTodo(todo) {
        try {
            setLoading(true)

            if (!todo.title) {
                setError('Todo item is required')
                setTimeout(() => {
                    setError(null)
                }, 4000)
                setLoading(false)
                return
            }

            const { data } = await axios.post(
                'http://localhost:3000/api/todos',
                todo,
                {
                    headers: { 'content-type': 'application/json' },
                }
            )

            setTodos((prevTodos) => [data.todo, ...prevTodos])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
            setTimeout(() => {
                setError(null)
            }, 4000)
            return
        }
    }

    async function fetchTodos() {
        try {
            setFetching(true)

            const { data } = await axios.get(
                'http://localhost:3000/api/todos',
                {
                    headers: { 'content-type': 'application/json' },
                }
            )

            if (!data || data === 'undefined') {
                setTodos([])
                return
            }

            setTodos(data ? data : [])

            setFetching(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
            setTimeout(() => {
                setError(null)
            }, 4000)
            return
        }
    }

    async function updateTodo(update, id) {
        try {
            setUpdating(true)

            const { data } = await axios.patch(
                `http://localhost:3000/api/todos/${id}`,
                update,
                {
                    headers: { 'content-type': 'application/json' },
                }
            )

            const updatedTodos = todos.map((todo) => {
                if (todo._id === data.todo._id) {
                    todo = data.todo
                }
                return todo
            })

            setTodos(updatedTodos)
            setUpdating(false)
        } catch (error) {
            setUpdating(false)
            setError(error.message)
            setTimeout(() => {
                setError(null)
            }, 4000)
            return
        }
    }

    async function deleteTodo(id) {
        try {
            setDeleting(true)
            await axios.delete(
                `http://localhost:3000/api/todos/${id}`,

                {
                    headers: { 'content-type': 'application/json' },
                }
            )

            const updatedTodo = todos.filter((todo) => todo._id !== id)

            setTodos(updatedTodo)
            setDeleting(false)
        } catch (error) {
            setDeleting(false)
            setError(error.message)
            setTimeout(() => {
                setError(null)
            }, 4000)
            return
        }
    }

    const values = {
        todos,
        addTodo,
        fetchTodos,
        updateTodo,
        deleteTodo,
        error,
        loading,
        fetching,
        updating,
        deleting,
    }
    return (
        <TodoContext.Provider value={values}>{children}</TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext)

export default TodoProvider
