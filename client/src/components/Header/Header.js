import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='topnav'>
            {/* Logo */}
            <Link id="logo-link" to="/">
                <img className="topnav-logo" src={ "/logo192.png" } alt="React logo" />
            </Link>

            {/* Page Links */}
            <div className="topnav-right">
                {/* Sign in Page */}
                <Link className="topnav-link" to='/Register'>Sign in</Link>
                {/* Projects Page */}
                <Link className="topnav-link" to='/projects'>Projects</Link>
                {/* Events Page */}
                <a className="topnav-link" 
                   target='_blank' 
                   rel="noopener noreferrer" 
                   href="https://www.facebook.com/groups/ufosc/events/?source=4&action_history=null&filter=calendar">
                    Events
                    <i className="fas fa-external-link-alt external-link" 
                       data-fa-transform="up-6"></i>
                </a>
                {/* Resources Page */}
                <a className="topnav-link" 
                   target='_blank' 
                   rel="noopener noreferrer" 
                   href="https://github.com/ufosc/club-resources">
                    Resources
                    <i className="fas fa-external-link-alt external-link" 
                       data-fa-transform="up-6 right-4"></i>
                </a>
                {/* About Page */}
                <Link className="topnav-link" to="/about">About</Link>
                {/* Notes Page */}
                <Link className="topnav-link" to="/Notes">Notes</Link>

                {/* To Add a page: 
                    <Link className="topnav-link" to="/LinkPath">Visible Text</Link>
                /LinkPath is the "exact path" specified in App.js */}
            </div>
        </div>
    )
}

export default Header;
