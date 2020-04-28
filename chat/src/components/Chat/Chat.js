import React, { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet-async';
import {Router, Link, Redirect} from 'react-router-dom';
import './Chat.css';
import axios from 'axios';
import queryString from 'query-string';
import io from 'socket.io-client';

export default function Chat ({ location }){
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const socket = io('http://localhost:8090');

    useEffect(() => {
        const {room, name} = queryString.parse(location.search);
        
        setName(name)
        setRoom(room)
        
        socket.emit('join', { name, room })
        
    }, [8090, location.search]);

    return(
        <div className='chatContainer'>
            <Helmet>
                <title>Chat</title>
            </Helmet>
            <h1>Chat</h1>
            <div className='chatMessages'>

            </div>
            <form onSubmit='onSubmit'>
                <label htmlFor='chatInput'>
                    <input type='textarea' id='chatInput' placeholder='Enter message' />
                </label>
                <button type='submit'>Send</button>
            </form>
            <button onClick={() => <Redirect to= '/' />}>Leave chat</button>
        </div>
    )
}