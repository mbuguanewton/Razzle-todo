import React, { useState, useEffect } from 'react'
import './scss/main.scss'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Notfound from './pages/404'
import ScreenLoader from './components/ScreenLoader'

const App = () => {
    const [loading, setLoading] = useState(false)

    const handleLoader = (e) => {
        if (
            e.target.readyState === 'loading' ||
            e.target.readyState === 'interactive'
        ) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        document.addEventListener('readystatechange', handleLoader)

        return () =>
            document.removeEventListener('readystatechange', handleLoader)
    }, [])
    return (
        <>
            {loading ? (
                <ScreenLoader />
            ) : (
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='*' component={Notfound} />
                </Switch>
            )}
        </>
    )
}

export default App
