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
    //let [oldMessages, setOldMessages] = useState([])

    useEffect(() => {
        const { room, name } = queryString.parse(location.search);
        setName(name)
        setRoom(room)

        socket.on('oldMessages', (res) => {
            // let oldMessages
            // console.log(res);
            // res.res.map((oldMessage, i) => {
            //     setMessages([...messages, oldMessage.messageSent]);
                
           // });
            //setMessages([...messages, res.res.map(oldMessage => oldMessage.messageSent)])
            // console.log('oldmessages received')
            // console.log(res)
            
            res.res.map((m) =>{
                setMessages([...messages, {user: m.messageSent.name, text: m.messageSent.text}])
            });
            
           //blurb = res.res.map(getOldMessage)
        })
    }, [messages]);

    // function getOldMessage(msg){

    // }

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
        
    }, ['localhost:8090', location.search]);//om dessa två parametrar ändras så körs denna useEffect

    function onSubmitMessage(e) {
        e.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    useEffect(() => {
        socket.on('message', (message) => {
            console.log('got a message')
            console.log(message);
            console.log(messages);
            setMessages([...messages, message]);
            console.log(message);
            console.log(messages);       
         });
    }, [messages]);

    //console.log(message, messages);
    
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