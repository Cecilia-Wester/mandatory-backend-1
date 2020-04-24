import React, { Component } from 'react';
import {Helmet} from 'react-helmet-async';
import {Router, Link} from 'react-router-dom';
import './Chat.css'

export default function Chat (){
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
        </div>
    )
}