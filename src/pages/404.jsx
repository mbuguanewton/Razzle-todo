import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
    return (
        <div className='notfound'>
            <div className='notfound__wrapper'>
                <h1>404 - Not found</h1>
                <br />
                <Link to='/' className='link'>
                    <p>Back home &rarr;</p>
                </Link>
            </div>
        </div>
    )
}

export default Notfound
