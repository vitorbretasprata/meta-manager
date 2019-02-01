import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ({ classname, type, color, size }) => (    
    <div className={classname}>
        <ReactLoading type={type} color={color} height={size} width={size} />
    </div>   
)

export default Loading;