import React from 'react';

const Input = ({ type, placeholder, id, name, handleChange, erros }) => (
    <div className={`form-group ${erros}`}>        
        <input id={id} type={type} name={name} className="inputForm" placeholder={placeholder} onChange={handleChange} />
    </div>
)

export default Input