import React from 'react'

const Failed = ({ message }) => (
    <div class="alert alert-danger container" role="alert">
        {message}
    </div>
)

export default Failed;