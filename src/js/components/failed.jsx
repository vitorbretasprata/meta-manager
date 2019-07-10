import React from 'react'

const Failed = ({ message }) => (
    <div className="alert alert-danger container" role="alert">
        {message}
    </div>
)

export default Failed;