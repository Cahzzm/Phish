import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import './NavBar.css'
import LogoutButton from './auth/LogoutButton';

const UserDropdown = () => {
    const history = useHistory();

    const user = useSelector((state) => state.session.user);

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return
        else setShowMenu(true)
    };

    useEffect(() => {
        if (!showMenu) { return }
        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    return (
        <div className='dropdown-main'>
            <div
                className='account-dropdown-button'
                onClick={() => openMenu()}>
                <div className='account-dropdown-button-children'>
                    <div>
                        {
                            user &&
                            <div className='hi-user'>
                                Hello, {`${user?.username}`}!
                            </div>
                        }
                    </div>
                    <div className='dropdown-arrow'>
                        <i class="fa-solid fa-chevron-down" />
                    </div>
                </div>
            </div>

            {showMenu && (
                <div className="user-dropdown-container">
                    {!user && (
                        <div className='login-signup-container'>
                            <NavLink
                                to='/login'
                                className='login-button'>
                                Sign In
                            </NavLink>
                        </div>
                    )}
                    <NavLink className='sell-with-phish' to='/products/new' exact={true}>
                        Sell With Phish
                    </NavLink>
                    <div
                        className="user-dropdown-button"
                        onClick={() => history.push('/history')}>
                        Order History
                    </div>
                    <LogoutButton />
                </div>

            )}
        </div>
    )
}

export default UserDropdown
