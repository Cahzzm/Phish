import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <NavLink className='logout-btn' to='/' onClick={onLogout}>Logout</NavLink>;
};

export default LogoutButton;
