import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import Loader from 'react-spinners/PuffLoader'
import { useTodo } from '../context/TodosContext'

function TodoItem({ todo }) {
    const { updateTodo, deleteTodo, deleting, updating } = useTodo()
    return (
        <div className='todoitem'>
            <div className='todoitem__wrapper'>
                <h3
                    className={
                        todo?.complete
                            ? 'todoitem__wrapper--title complete'
                            : 'todoitem__wrapper--title'
                    }
                    onClick={async () => {
                        const update = {
                            ...todo,
                            complete: !todo.complete,
                        }

                        await updateTodo(update, todo._id)
                    }}>
                    {todo?.title}
                </h3>

                <span>
                    {updating && 'updating ....'}
                    {todo?.complete ? (
                        deleting ? (
                            <span>deleting</span>
                        ) : (
                            <FaTrashAlt
                                className='icon'
                                onClick={() => {
                                    deleteTodo(todo._id)
                                }}
                            />
                        )
                    ) : null}
                </span>
            </div>
        </div>
    )
}

export default TodoItem
