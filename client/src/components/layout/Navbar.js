import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div>
                <nav>
                    <ul>
                        <li><h1>Crowned Jewels</h1></li>
                            <li className="dropdown">
                                <a className="dropbtn" href="profile.html"> <img src="../images/profile.png" width="45px"></img> </a>
                                    <div className="dropdown-content" >
                                        <a href="sign-up.html">Sign-up</a>
                                        <a href="login.html">Login</a>
                                        <a href="#">Logout</a>
                                    </div>
                            </li>
                        <li className="nav-right"><a href="contact.html">Contact</a></li>
                        <li className="nav-right"><a href="posts.html">Posts</a></li>
                        <li className="nav-right"><a href="daily-encouragement.html">Daily Encouragment</a></li>
                        <li className="nav-right"><a href="home.html">Home</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar