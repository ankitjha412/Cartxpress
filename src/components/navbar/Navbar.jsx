/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

const Navbar = ({ onSearch, onSort, onCategoryChange,  count }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchClick = () => {
        onSearch(searchQuery);
        setSearchQuery(''); 
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>CartXpress</h1>
            </div>
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearchClick} className="search-button">Search</button>
            </div>
            <div className="navbar-filters">
                <select onChange={(e) => onSort(e.target.value)} className="navbar-dropdown">
                    <option value="">Sort by</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
                <select onChange={(e) => onCategoryChange(e.target.value)} className="navbar-dropdown">
                    <option value="">Category</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="electronics">Electronics</option>
                </select>
            </div>
            <div className="cart-icon">
                <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping} style={{color: "#febd69"}} />
                    <div className="count">{count}</div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
