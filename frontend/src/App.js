// frontend/src/App.js
import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import LoginFormPage from "./components/Session/LoginFormPage";
import SignupFormPage from "./components/Session/SignupFormPage";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import PhotosPage from "./components/Photos/PhotosPage";
import PhotoShow from "./components/Photos/PhotoShow";
import Footer from "./components/Footer";
import PhotoUpload from "./components/Photos/PhotoUpload";
import Albums from "./components/Albums/AlbumList";
import TagShow from "./components/TagShow";
import AlbumForm from "./components/Albums/AlbumForm";
import AlbumShow from "./components/Albums/AlbumShow";

function App() {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div
            className={`main-container ${
                currentPath === "/" ? "no-scroll" : ""
            }`}
        >
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
                        <SignupFormPage />
                    </Route>
                    <Route path="/photos/:id">
                        <PhotoShow />
                    </Route>
                    <Route path="/photos">
                        <PhotosPage />
                    </Route>
                    <Route path="/upload">
                        <PhotoUpload />
                    </Route>
                    <Route path="/albums" exact component={Albums} />
                    <Route path="/albums/new" exact component={AlbumForm} />
                    <Route
                        path="/albums/:albumId"
                        exact
                        component={AlbumShow}
                    />
                    <Route path="/tags/:tagId" component={TagShow} />
                </Switch>
            </div>
            {currentPath !== "/login" && currentPath !== "/signup" && (
                <Footer className="footer" />
            )}
        </div>
    );
}

export default App;
