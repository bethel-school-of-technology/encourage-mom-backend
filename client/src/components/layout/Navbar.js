import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="nav bg-dark">
        <h1>Crown of Jewels</h1>
        <ul>
            <li>
                <a href="home.html">Home</a></li>
            <li><a href="daily-encouragement.html">Daily Encouragment</a></li>
            <li><a href="posts.html">Posts</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>

        <ul>
            <li>
                <Link to='/Signup'>Signup</Link>
            </li>
            <li>
                <Link to='/Login'>Login</Link>
            </li>
        </ul>
    </nav>
    )
}

export default Navbar