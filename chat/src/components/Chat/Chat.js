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
    let [message, setMessage] = useState('');
    let [messages, setMessages] = useState([]);

    useEffect(() => {
        const { room, name } = queryString.parse(location.search);
        setName(name)
        setRoom(room)

        socket.on('oldMessages', (res) => {
            res.map((oldMessage, i) => {
                return(console.log(oldMessage))
            });
        })
    });

    useEffect(() => {
        const {room, name} = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        
        socket.emit('join', { room, name }, () => {
        });

        // socket.on('oldMessages', ( res ) => {
        //     if(res.length) {
        //         for(let i=0; i<res.length;i++){
        //             console.log(i, res)
        //         }
        //     }
        //     console.log(res)
        //     // res.map((message, i) => {
        //     //     return(console.log (message, i))
        //     //});
        // })

        return() => {
            socket.emit('disconnect');
            socket.off();
        }
        
    }, ['localhost:8090', location.search]);//om dessa två parametrar ändras så körs denna useEffect

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

    console.log(message,messages);
    
    return(
        <div className='chatOuterContainer'>
            <Helmet>
                <title>Chat</title>
            </Helmet>
            <Header />
            <h1>Chat</h1>
                <div className='chatInnerContainter' >
                    <InfoBar room={room} location={location}/>
                    <Messages messages={messages} name={name} />
                    <Input onSubmitMessage={onSubmitMessage} message= {message} setMessage={setMessage} />
                </div>
        </div>
    )
}