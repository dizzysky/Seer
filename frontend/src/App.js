// frontend/src/App.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import PhotosPage from './components/PhotosPage';
import Footer from './components/Footer'

function App() {
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
          <Route path="/photos">
            <PhotosPage />
          </Route>
        </Switch>
      </div>
      <Footer className="footer" />
    </div>
  );
}


export default App;
