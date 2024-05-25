import React from 'react'
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
        <div className="logo">Logo</div>

        <div className="items">
            <ul className="task-list">
                <li className="item-1">Task 1</li>
                <li className="item-2">Task 2</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
