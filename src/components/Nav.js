import React from 'react';
import {  Link } from 'react-router-dom';



const Nav = () => {

    return (

        <div>           
             <div>
            {
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">The CarShop</Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/buy">Buy a car</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sell">Sell a car</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

            }

            
        </div>
        </div>

    )
}

export default Nav;