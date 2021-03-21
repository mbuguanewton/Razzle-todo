import React, { useState } from 'react'
import Loader from 'react-spinners/SyncLoader'
import { useTodo } from '../context/TodosContext'

function InputItem() {
    const { loading, addTodo, error } = useTodo()
    const [todo, setTodo] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newTodo = {
            title: todo,
        }
        await addTodo(newTodo)

        setTodo('')
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className='formgroup'>
                <label htmlFor='todo'>Todo</label>
                <input
                    type='text'
                    value={todo}
                    className='formgroup__control'
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder='Add todo ...'
                />

                {error && <small className='error'>{error}</small>}
            </div>
            <button type='submit' className='btn btn--submit'>
                {loading ? (
                    <Loader color='#171717' size={6} margin={5} />
                ) : (
                    'Add todo'
                )}
            </button>
        </form>
    )
}

export default InputItem
