import App from './App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { hydrate } from 'react-dom'
import TodoProvider from './context/TodosContext'

hydrate(
    <TodoProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </TodoProvider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept()
}
