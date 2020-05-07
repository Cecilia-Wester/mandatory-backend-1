import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import Message from './Message/Message';

export default function Messages ({messages, name}) {
    //console.log(messages)
    // messages.push(messages[0])
    // console.log(messages)
    /*
    return(
        <ScrollToBottom className='messages'>
            {messages.map((message, i) => {
                //console.log('Messages: ' + messages + ' ' + message.text)
                //console.log(messages)
                //console.log(i)
                return(
                    <div key={i} className='chatMessage'>
                        <Message message={message} name={name} />
                    </div>
                ) 
            })} 
        </ScrollToBottom>
    )
    */
   return(
    <ScrollToBottom className='messages'>
        {messages.map((msg, i) => { 
            
              
             i = msg.id
            console.log(msg)
            return(
                <div key={i} className='chatMessage'>
                    <Message message={msg} name={name}/>
                </div>
            )
        })
    }
    </ScrollToBottom>
)
}