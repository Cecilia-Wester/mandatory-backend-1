import React, { useState } from 'react';
import {Helmet} from 'react-helmet-async';
import {Router, Link} from 'react-router-dom';
import './Room.css';
import NewRoomModal from './NewRoomModal';

export default function Room (){
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [roomname, setRoomname] = useState('');

    function createNewRoom(){
        setCreateRoomModal(true)
    }
    
    function onSubmit(e){
        e.preventDefault()

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
                <button className='createNewRoom' onClick={createNewRoom(createRoomModal, setCreateRoomModal, )}>Create new room</button>
            </div>
            {createRoomModal && <NewRoomModal room={roomname} setCreateRoomModal={setCreateRoomModal} /> }
        </div>
    )
}