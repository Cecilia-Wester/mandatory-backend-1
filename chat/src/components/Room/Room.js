import React, { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet-async';
import {Router, Link} from 'react-router-dom';
import './Room.css';
import NewRoomModal from './NewRoomModal';
import io from 'socket.io-client';

export default function Room (){
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [roomname, setRoomname] = useState('');

    useEffect(() => {
        socket.on('connect')
    }, [])

    function createNewRoom(){
        setCreateRoomModal(true);
        setRoomname('');
    }
    
    function onSubmit(e){
        e.preventDefault();
    }


    return(

        <div className='roomContainer' >
            <Helmet>
                <title>Room</title>
            </Helmet>
            <div>
                <form onSubmit={onSubmit}>
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
                <button className='createNewRoom' onClick={createNewRoom}>Create new room</button>
            </div>
            {createRoomModal && <NewRoomModal room={roomname} setCreateRoomModal={setCreateRoomModal} createRoomModal={createRoomModal} createNewRoom={createNewRoom}/> }
        </div>
    )
}