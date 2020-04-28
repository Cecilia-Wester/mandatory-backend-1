import React from 'react';
import './App.css';
import axios from 'axios';
import socket from './utility/socket';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {HelmetProvider, Helmet} from 'react-helmet-async';
import Room from './components/Room/Room';
import Chat from './components/Chat/Chat';
import Header from './components/Header/Header'

export default function App() {
    socket.emit('connect', ('hej'));
    return (
        <div className="App">
            <HelmetProvider>
                <Header />
                <Router>
                    <Route path= '/' exact component={Room} />
                    <Route path= '/chat' component={Chat} />
                </Router>
            </HelmetProvider>
        </div>
    );
}
