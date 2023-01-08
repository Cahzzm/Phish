import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import './404.css'


const ResourceNotFound = () => {
    return (
        <div className="not-found-container">
            <div className='not-found-content'>
            <img alt="oops" src="https://res.cloudinary.com/drybvuzux/image/upload/v1673129456/phish-not-found_kwzfzc.png"></img>
            <h1 className="not-found-title">Oops! This page does not exist.</h1>
            <p className="not-found-body">The page you're looking for doesn't exist. Double-check the URL you typed in, or head back to the Homepage.</p>
            <div className="continue-shopping-not-found">
                <NavLink to='/'>
                    <button id='continue-shopping-not-found'>Continue Shopping</button>
                </NavLink>
            </div>
            </div>
        </div>
    )
}


export default ResourceNotFound
