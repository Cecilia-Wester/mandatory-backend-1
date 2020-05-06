import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import Message from './Message/Message';

export default function Messages ({messages, name}) {
    
    return(
        <ScrollToBottom className='messages'>
            {messages.map((message, i) => {
                console.log(messages)
                return(
                    <div key={i} className='chatMessage'>
                        <Message message={message} name={name} />
                    </div>
                ) 
            })}; 
        </ScrollToBottom>
    )
}