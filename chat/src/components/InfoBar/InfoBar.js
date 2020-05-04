import React from 'react';
import './InfoBar.css';
import {Redirect} from 'react-router-dom'

export default function InfoBar ({room}){
    return(
        <div className='infoBar'>
            <div className='leftInnerContainer' >
                <p>{room}</p>
            </div>
            <div className='rightInnerContainer' >
                <button onClick={() => <Redirect to= '/' />}>Leave chat</button>
            </div>
        </div>
    );
}