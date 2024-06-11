import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screen/Login';
import Signup from './screen/Signup';
import Home from './components/Home';
import Navbar from './components/Navbar';


function App() {
    
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
            </Routes>
        
        </Router>
    );
}

export default App;
