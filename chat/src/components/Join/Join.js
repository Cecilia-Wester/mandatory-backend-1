import React, { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet-async';
import {Router, Link} from 'react-router-dom';
import './Join.css';
import NewRoomModal from './NewRoomModal';
import socket from '../../utility/socket';

export default function Join (){
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');

    function createNewRoom(){
        setCreateRoomModal(true);
        setRoom('');
    }    

    return(
        <div className='joinOuterContainer' >
            <Helmet>
                <title>Room</title>
            </Helmet>
            <div className='joinInnerContainer'>
                <form>
                    <label htmlFor='joinusername' className='inputfieldlabel'> Username: 
                        <input type='text' id='joinusername'  className='joinInput' placeholder='Enter username' onChange={(e) => setName(e.target.value)}></input>
                    </label>
                    <br/>
                    <label htmlFor='joinRoom' className='inputfieldlabel'> Chatroom:
                        <input id='joinRoom' type='radio' onChange={(e) => setRoom(e.target.value)}/>
                    </label>
                    <br/>
                    <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className='signInBtm' type='submit'>Enter room</button>
                    </Link>
                </form>
                <button className='createNewRoom' onClick={createNewRoom}>Create new room</button>
            </div>
            {createRoomModal && <NewRoomModal room={room} setRoom={setRoom} name={name} setName={setName} setCreateRoomModal={setCreateRoomModal} /> }
        </div>
    )
}