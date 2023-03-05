import React from 'react';
import  logo  from '../Resources/spinner.gif';

const FullPageLoader=() => {
    return (
        <div className="fp-container">
            <img src ={logo} className="fp-loader" alt="loading"/>
        </div>
    )
}

export default FullPageLoader;

