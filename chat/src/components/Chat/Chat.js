import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import queryString from 'query-string';
import socket from '../../utility/socket';
import Header from '../Header/Header';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

export default function Chat ({ location }){
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { room, name } = queryString.parse(location.search);
        setName(name)
        setRoom(room)

        socket.on('oldMessages', (res) => {
            setMessages(messages => [...messages, ...res.res.map(oldMessage => oldMessage.messageSent)])
        })
    }, [location.search]);

    useEffect(() => {
        const {room, name} = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        socket.emit('join', { room, name }, () => {
        });
        return() => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [location.search]);

    function onSubmitMessage(e) {
        e.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);      
        });
    }, [messages]);
    
    return(
        <div className='chatOuterContainer'>
            <Helmet>
                <title>Chat</title>
            </Helmet>
            <Header />
            <h1>Chat</h1>
            <div className='chatInnerContainer' >
                <InfoBar room={room} location={location}/>
                <Messages messages={messages} name={name} />
                <Input onSubmitMessage={onSubmitMessage} message= {message} setMessage={setMessage} />
            </div>
        </div>
    )
}