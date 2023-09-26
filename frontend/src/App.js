// frontend/src/App.js
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import PhotosPage from './components/PhotosPage';
import PhotoShow from './components/PhotoShow';
import Footer from './components/Footer'
import PhotoUpload from './components/PhotoUpload';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="main-container">
      <Navigation />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage/>
          </Route>
          <Route path="/photos/:id">
            <PhotoShow /> {/* your component to show individual photos */}
          </Route>
          <Route path="/photos">
            <PhotosPage />
          </Route>
          <Route path="/upload">
            <PhotoUpload />
          </Route>
        </Switch>
      </div>
      {(currentPath !== '/login' && currentPath !== '/signup') && <Footer className="footer" />}
    </div>
  );
}


export default App;
