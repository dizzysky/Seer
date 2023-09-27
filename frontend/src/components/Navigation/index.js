// frontend/src/components/Navigation/index.js

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/flickr.png';
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


function Navigation({ className }) {
  const location = useLocation();
  const isSplashPage = location.pathname === '/';
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDemoLogin = async () => {
    const demoUserData = { credential: 'demo@user.io', password: 'password' };
    await dispatch(sessionActions.login(demoUserData));
    window.location.href = '/photos';  // Navigate to Explore Photos page
  };
  

  const getNavBarClass = () => {
    if (isSplashPage) return 'translucent';
    if (location.pathname === '/login' || location.pathname === '/signup') return '';
    return 'dark';
  };
  

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="profile-button-container">
        <NavLink to="/upload"> 
          <FontAwesomeIcon icon={faUpload} className='upload-icon' /> 
        </NavLink>
        <ProfileButton user={sessionUser} className='profile-icon' />
      </div>
    );
  } else {
    sessionLinks = (
        <>
          <button className="nav-link" onClick={handleDemoLogin}>Demo Log In</button>
          <NavLink className="nav-link" to="/login">Log In</NavLink>
          <NavLink className="nav-link navbar-signup-button" to="/signup">Sign Up</NavLink>
        </>
      );
  }

  return (
    <ul className={`nav-list ${getNavBarClass()}`}>
      <li className="nav-item">
        <NavLink className="nav-link seer-link" exact to="/" activeClassName="active">
        <img src={logo} alt="Seer logo" className="seer-logo" />
          Seer
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/photos" activeClassName="active">
          Explore Photos
        </NavLink>
      </li>
      <li className="nav-item session-links">
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;