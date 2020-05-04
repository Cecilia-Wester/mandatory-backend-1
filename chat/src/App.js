import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
