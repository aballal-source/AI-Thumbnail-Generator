import React from 'react';
import './Header.css';

function Header() {
    return (
        <>
        <header className="header">
        <div className="header__logo">
            <a href="/"><img src="./favicon1.png" alt="SuperViral.ai logo" /></a>
        </div>
        <h4>AuraFrame</h4>
        <nav className="header__nav">
            <ul>
            <li><a href="/">Home</a></li>
            </ul>
        </nav>
        </header>
        </>
    );
}

export default Header;