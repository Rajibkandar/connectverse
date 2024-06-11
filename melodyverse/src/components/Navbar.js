import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

     useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    }, []);


  const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">MelodyVerse</Link>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button>
                            {/* Add any additional links or components here for logged-in users */}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
                            <Link to="/signup" className="text-white hover:text-gray-200">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
