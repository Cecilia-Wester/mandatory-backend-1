import React, { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './Join.css';
import NewRoomModal from './NewRoomModal';
import axios from 'axios';

export default function Join (){
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [rooms, setRooms] = useState([]);
    const [id, setId] = useState('')

    useEffect(() => {
        axios.get('/chat')
        .then(( res ) => {
            setRooms([...rooms, res.data]);
        })
        .catch((err) =>{
            console.log(err)
        })
    },[])

    useEffect((_id) => {
        axios.get('/chat/:id')
        .then((res)=>{
            console.log(res);
            setRoom(res.room)
            setId(res._id)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    function onClickDelete(e){
        e.preventDefault();
        setRoom(room);
    }

    function createNewRoom(){
        setCreateRoomModal(true);
        setRoom('');
    }    
    console.log(rooms)
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
                    <div name='room' id='room'>
                        {rooms.map((room,i) => { 
                            return( 
                            room.map((r, index) => {
                                return(
                                    <div key={r._id} >
                                        {r.room}
                                        <Link onSubmit={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                                            {setRoom(r.room)}
                                            <button className='signInBtn' type='submit'>Enter room</button>
                                        </Link>
                                        <button onClick={(e) => onClickDelete(e) }>Delete</button>
                                    </div>
                                )
                            })
                        )})}    
                    </div>
                    <br/>
                    
                </form>
                <button className='createNewRoom' onClick={createNewRoom}>Create new room</button>
            </div>
            {createRoomModal && <NewRoomModal room={room} setRoom={setRoom} name={name} setName={setName} setCreateRoomModal={setCreateRoomModal} createRoomModal={createRoomModal} /> }
        </div>
    )
}