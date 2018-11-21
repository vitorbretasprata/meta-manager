import React from 'react';

const ImageLogo = ({ path, classname }) => (
    <div className={classname}>
        <img src={path}/>
    </div>
)

export default ImageLogo