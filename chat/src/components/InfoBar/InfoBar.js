import React from 'react';
import './InfoBar.css';
import { Link } from 'react-router-dom';

export default function InfoBar ({room}){
    return(
        <div className='infoBar'>
            <div className='leftInnerContainer' >
                <p>{room}</p>
            </div>
            <Link to= '/' className='rightInnerContainer' >
                <button>Leave chat</button>
            </Link>
        </div>
    );
}