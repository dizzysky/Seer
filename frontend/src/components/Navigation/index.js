// frontend/src/components/Navigation/index.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/flickr.png';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
        <div className="profile-button-container">
        <ProfileButton user={sessionUser} />
      </div>
      
    );
  } else {
    sessionLinks = (
        <>
          <NavLink className="nav-link" to="/login">Log In</NavLink>
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </>
      );
  }

  return (
    <ul className="nav-list">
      <li className="nav-item">
        <NavLink className="nav-link seer-link" exact to="/" activeClassName="active">
        <img src={logo} alt="Seer logo" className="seer-logo" />
          Seer
        </NavLink>
      </li>
      <li className="nav-item session-links">
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;