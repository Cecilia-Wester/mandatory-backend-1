import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';

export default function Message ({ message: {user, text}, name }) {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if(user === trimmedName){
        isSentByCurrentUser = true;
    }
    
    return(
        isSentByCurrentUser
            ?   (
                <div className='messageContainer justifyEnd'>
                    <p className='sentText pr-10'>{user}</p>
                    <div className='messageBox backgrundDark'>
                        <p className='messageText textLight'>{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
                )
            :   
                (
                <div className='messageContainer justifyStart'>
                    <div className='messageBox backgroundLight'>
                        <p className='messageText textDark'>{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className='sentText pl-10'>{user}</p>
                </div>
            )
    )
}