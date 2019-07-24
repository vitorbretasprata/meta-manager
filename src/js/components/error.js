import React from 'react';

const Error = ({errorMessage}) => (
    <div className="alert alert-danger" role="alert">
        {errorMessage}
    </div>
)

export default Error;