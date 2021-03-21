import React from 'react'
import { PuffLoader as Loader } from 'react-spinners'

function ScreenLoader() {
    return (
        <div className='screenloader'>
            <Loader color='#06d6a0' size={100} />
        </div>
    )
}

export default ScreenLoader
