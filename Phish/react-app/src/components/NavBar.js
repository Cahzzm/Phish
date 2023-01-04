
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)


  return (
    <div className='navbar-container'>
      <div className='phish-home-button'>
          <NavLink to='/' exact={true}>
            phish
          </NavLink>
      </div>

      <div className='right-side-navbar'>
          <NavLink to='/login' exact={true}>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true}>
            Sign Up
          </NavLink>
          {sessionUser &&
          <>
              <NavLink to='/products/new' exact={true}>
                Sell With Phish
              </NavLink>
              <NavLink to='/cart' exact={true}>
                  <img id='phish-shopping-cart' alt='' src='https://res.cloudinary.com/drybvuzux/image/upload/v1672795199/phish-shopping-cart_bqp9cr.svg'></img>
              </NavLink>
          </>
          }
        {/*
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
         */}
          <LogoutButton />
      </div>
    </div>
  );
}

export default NavBar;
