import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container nav-content">
         
            <span style={{ fontSize: '1.8rem' }}>Plus Care</span>
         
          <div className="nav-links">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Professional Healthcare Booking</span>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
