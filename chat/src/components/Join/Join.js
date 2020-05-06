import React, { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet-async';
import {Router, Link} from 'react-router-dom';
import './Join.css';
import NewRoomModal from './NewRoomModal';
import socket from '../../utility/socket';
import axios from 'axios';

export default function Join (){
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');

useEffect(() => {
    axios.get('http://localhost:8090')
    .then((err, res) => {
        console.log(err, res)
    });
}, [])

    function createNewRoom(){
        setCreateRoomModal(true);
        setRoom('');
    }    

    return(

        <div className='joinOuterContainer' >
            <Helmet>
                <title>Join</title>
            </Helmet>
            <div className='joinInnerContainer'>
                <form>
                    <label htmlFor='username' className='inputfieldlabel'> Username: 
                        <input type='text' id='username'  className='joinInput' placeholder='Enter username' onChange={(e) => setName(e.target.value)}></input>
                    </label>
                    <br/>
                    <label htmlFor='room' className='inputfieldlabel'> Chatroom:
                        <input type='radio' id='room'  className='joinInput' onChange={(e) => setRoom(e.target.value)}/>
                    </label>
                    <br/>
                    <Link onSubmit={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className='signInBtn' type='submit'>Enter room</button>
                    </Link>
                </form>
                <button className='createNewRoom' onClick={createNewRoom}>Create new room</button>
            </div>
            {createRoomModal && <NewRoomModal room={room} setRoom={setRoom} name={name} setName={setName} setCreateRoomModal={setCreateRoomModal} createRoomModal={createRoomModal} createNewRoom={createNewRoom}/> }
        </div>
    )
}