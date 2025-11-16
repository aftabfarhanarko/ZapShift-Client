import React from 'react';
import logo from '../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-center'>
            <img src={logo}></img>
            <p className=' text-3xl font-semibold  -ms-3.5'>zapShift</p>
        </div>
    );
};

export default Logo;