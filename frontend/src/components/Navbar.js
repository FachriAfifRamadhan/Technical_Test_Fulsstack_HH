import React from 'react';
import logo from '../media/Rename.png';
 
const Navbar = () => {
 
    return (
        <nav className="navbar is-white" aria-label="main navigation">
            <div className="container-flex">
                <div className="navbar-brand">
                    <img src={logo} alt='logo' className='logo'>
                    </img>

                </div>
            </div>
        </nav>
    )
}
 
export default Navbar