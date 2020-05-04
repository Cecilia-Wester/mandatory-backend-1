import React, { useState, useEffect } from 'react';
import './Header.css';
import {Helmet} from 'react-helmet-async';
import {Router, Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import socket from '../../utility/socket';


export default function Header(){
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    
    return(
        <div className='headerContainer'>
            <h1>`Welcome to this cool chat!`</h1>
            <p >`You are in room`</p>
        </div>
    );
}