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
    const [rooms, setRooms] = useState([{name: 'test1'},{name: 'test2'}, {name: 'test3'}])

    useEffect(() => {
        axios.get('http://localhost:8090/rooms')
        .then(( res ) => {
            setRooms([...rooms, res.room]);
        })
        .catch((err) =>{
            console.log(err)
        })
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
                    <select name='room' id='room'>
                        {/*rooms.map((room) => {
                            <option 
                                key={room.id}

                                > 
                                {room}
                            </option>
                        })*/}
                        
                    </select>
                    
                    <br/>
                    <Link onSubmit={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className='signInBtn' type='submit'>Enter room</button>
                    </Link>
                </form>
                <button className='createNewRoom' onClick={createNewRoom}>Create new room</button>
            </div>
            {createRoomModal && <NewRoomModal room={room} setRoom={setRoom} name={name} setName={setName} setCreateRoomModal={setCreateRoomModal} createRoomModal={createRoomModal} /> }
        </div>
    )
}