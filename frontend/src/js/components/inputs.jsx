import React from 'react';

const Input = ({ type, placeholder, id, name }) => (
    <div className="form-group">        
        <input id={id} type={type} name={name} className="form-control" placeholder={placeholder}/>
    </div>
)

export default Input