import React, { useEffect, lazy, Suspense } from 'react'
import { useTodo } from '../context/TodosContext'
import TodoLazy from './TodoLazy'

const TodoItem = lazy(() => import('./TodoItem'))

function TodosList() {
    const { fetchTodos, todos, fetching } = useTodo()

    useEffect(() => {
        fetchTodos()
    }, [])
    return (
        <div className='todolist'>
            <h2>Your Todos</h2>
            <div className='todolist__wrapper'>
                {fetching && <TodoLazy />}
                {!todos?.length && !fetching && (
                    <span>No todos available &#9785; </span>
                )}
                {todos &&
                    todos.map((todo) => (
                        <Suspense key={todo?._id} fallback={<TodoLazy />}>
                            <TodoItem todo={todo} />
                        </Suspense>
                    ))}
            </div>
        </div>
    )
}

export default TodosList
