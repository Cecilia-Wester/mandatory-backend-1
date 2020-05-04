import React from 'react';
import './App.css';
import axios from 'axios';
import socket from './utility/socket';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {HelmetProvider, Helmet} from 'react-helmet-async';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

export default function App() {
    
    return (
        <div className="App">
            <HelmetProvider>
                <Router>
                    <Route path= '/' exact component={Join} />
                    <Route path= '/chat' component={Chat} />
                </Router>
            </HelmetProvider>
        </div>
    );
}
