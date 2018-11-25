import React from 'react';

const Input = ({ type, placeholder, text }) => (
    <div className="form-group">
        <label htmlFor={type}>{text}</label>
        <input id={type} type={type} className="form-control" placeholder={placeholder}/>
    </div>
)

export default Input