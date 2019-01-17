import React from 'react'
import { Spinner } from 'reactstrap'

const Loading = () => (
    <div className="container">
        <div>
            <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>        
    </div>
)

export default Loading;