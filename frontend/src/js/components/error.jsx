import React from 'react'

const Error = ({ errorMessage }) => (
    <div className="container">
        <div className="ticketWindow">
            {errorMessage}
        </div>        
    </div>
)

export default Error