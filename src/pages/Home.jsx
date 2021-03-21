import React from 'react'
import InputItem from '../components/InputItem'
import TodosList from '../components/TodosList'
import { Helmet } from 'react-helmet'
import ScreenLoader from '../components/ScreenLoader'

function Home() {
    return (
        <>
            <Helmet>
                <title>Todo app with razzle</title>
                <meta
                    name='description'
                    content='Todo app using create-razzle-app'
                />
                <meta
                    name='keywords'
                    description='razzle, todo app, mongoose-razzle-app'
                />
            </Helmet>
            <div className='home'>
                <div className='home__wrapper'>
                    <h1>Hello world of razzle</h1>
                    <InputItem />
                    <TodosList />
                </div>
            </div>
        </>
    )
}

export default Home
