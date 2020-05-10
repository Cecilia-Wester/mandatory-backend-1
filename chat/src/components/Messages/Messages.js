import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import Message from './Message/Message';

export default function Messages ({messages, name}) {
    return(
        <ScrollToBottom className='messages'>
            {messages.map((msg, i) => {
                i = msg.id
                return(
                    <div key={i} className='chatMessage'>
                        <Message message={msg} name={name}/>
                    </div>
                )
            })}
        </ScrollToBottom>
    )
}