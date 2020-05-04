import React from 'react';
import './Input.css'

export default function Input ({ onSubmitMessage, message, setMessage }){
    return(
        <div className='input'>
        <form onSubmit={onSubmitMessage}>
                <label htmlFor='chatInput'>
                    <input 
                        value={message} 
                        type='text' 
                        id='chatInput' 
                        placeholder='Type a message...' 
                        onChange={(e) => {setMessage(e.target.value)}}
                    />
                </label>
                <br />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}