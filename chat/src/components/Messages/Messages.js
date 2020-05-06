import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import Message from './Message/Message';

export default function Messages ({messages, name}) {
    let counter = 0;
    return(      
        <ScrollToBottom className='messages'>
            {console.log('messages ' +messages)}
            {messages.map((message, i) => {
                if(Array.isArray(message)) {
                    message.map((msg, counter) => {
                        console.log('is array: '+ counter + ' ' + msg.text)
                        return(
                            // <div key={counter++} className='chatMessage'>
                            //     <Message message={msg} name={name} />
                            // </div>
                            <div key={counter++} className='chatMessage'>
                                <Message message={msg} name={name} />
                            </div>
                        ) 
                    })
                } else {
                    console.log('is NOT array: '+ counter + ' ' + message.text)
                return(
                    <div key={i} className='chatMessage'>
                        <Message message={message} name={name} />
                    </div>
                )} 
            })}
        </ScrollToBottom>
    )
}