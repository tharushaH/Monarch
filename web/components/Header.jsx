import React from 'react';
import '../styles/Header.css'; // Import the CSS file

const Header = () => {
  return (
    <header className="navbar">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Website Name */}
        <div className="website-name">
          M O N A R C H
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/meetings" className="nav-link">
            Meetings
          </a>
          <a href="/tasks" className="nav-link">
            Tasks
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;