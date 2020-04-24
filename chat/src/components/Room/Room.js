import React from 'react';
import {Helmet} from 'react-helmet-async';
import {Router, Link} from 'react-router-dom';
import './Room.css'

export default function Room (){
    function createNewRoom(){
        
    }
    return(
        <div className='roomContainer' >
            <Helmet>
                <title>Room</title>
            </Helmet>
            <div>
                <form onSubmit='onSubmit'>
                    <label htmlFor='username' className='inputfieldlabel'> Username: 
                        <input type='text' id='username' placeholder='Enter username'></input>
                    </label>
                    <br/>
                    <label htmlFor='roomName' className='inputfieldlabel'> Chatroom:
                        <input type='text' id='roomname' placeholder='Enter name on room to enter' />
                    </label>
                    <br/>
                    <button type='submit'>Enter room</button>
                </form>
                <button className='createNewRoom' onClick='createNewRoom'>Create new room</button>
            </div>
        </div>
    )
}