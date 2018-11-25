import React from 'react';

const Button = ({divClass, buttonClass, textButton, type}) => (
    <div className={divClass}>
        <button type={type} className={buttonClass}>{textButton}</button>
    </div>
)

export default Button