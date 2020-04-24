import React from 'react';
import './Header.css'

export default function Header(){
    let inRoom;
    return(
        <div className='headerContainer'>
            <h1>Welcome to this cool chat.</h1>
            <p >`You are in room ${inRoom}`</p>
        </div>
    );
}