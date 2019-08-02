import React from 'react'

const Failed = ({ message }) => (
    <div className="you-failed" role="alert">
        {message}
    </div>
)

export default Failed;