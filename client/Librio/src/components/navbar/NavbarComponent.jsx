import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChartBar, FaUsers, FaBook, FaExchangeAlt } from "react-icons/fa";
import "./navbar.css";

function NavbarComponent() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Librio</Link>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
                <li><Link to="/"><FaHome /> Home</Link></li>
                <li><Link to="/dashboard"><FaChartBar /> Dashboard</Link></li>
                <li><Link to="/students"><FaUsers /> Students</Link></li>
                <li><Link to="/books"><FaBook /> Books</Link></li>
                <li><Link to="/rentals"><FaExchangeAlt /> Rentals</Link></li>
            </ul>
        </nav>
    );
}

export default NavbarComponent;
