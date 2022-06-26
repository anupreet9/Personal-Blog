import React from 'react';
import './index.css';
import Footer from './footer';
import {Switch, Route } from "react-router-dom";
import Home from './home';
import Contact from './contact';
import Blog from './blog';
import NotFoundPage from './Notfound';
import About from './about';
import Verify from './emails';
import Unsubscribe from './emails/unsubscribe';

function AppUser() {

  function handleClick() {
    document.getElementById('sidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.getElementById('sidebarCollapse').classList.remove('active');
    document.getElementById('sidebar').classList.remove('slide-out');
    document.getElementById('sidebar').classList.add('slide-in');
  }

  function handleBack() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('sidebarCollapse').classList.add('active');
    document.getElementById('sidebar').classList.remove('slide-in');
    document.getElementById('sidebar').classList.add('slide-out');
  }


  return (

    <div className="wrapper">
      <nav id="sidebar" className="slide-in">

        <button className="btn" id="dismiss" onClick={handleBack}>
          <i className="icon-back fas fa-arrow-left"></i>
        </button>
        <img className="logo-img" src="https://i.ibb.co/q07rnNh/Untitled-1-November-2020-01-43-36-6.jpg" alt="logo"></img>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link-side nav-link text-center" href="/home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link-side nav-link text-center" href="/about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link-side nav-link text-center" href="/posts">Posts</a>
          </li>
          <li className="nav-item">
            <a className="nav-link-side nav-link text-center" href="/contact">Contact</a>
          </li>
        </ul>
        <div className="spacerr">

        </div>
        <Footer />
      </nav>
      <nav className="navbar navbar-expand-md" >
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand " href="/home"><img className="logo-img text-center" src="https://i.ibb.co/q07rnNh/Untitled-1-November-2020-01-43-36-6.jpg" alt="logo"></img></a>
          </div>
          <button className="navbar-toggler active" onClick={handleClick} type="button" id="sidebarCollapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" >
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link navigation-link" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link  navigation-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link navigation-link" href="/posts">Posts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link navigation-link" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="overlay" className="overlay" onClick={handleBack}></div>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route exact path="/posts">
            <Blog />
          </Route>
          <Route exact path="/posts/:postId">
            <Blog />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/verify/:randomString">
            <Verify />
          </Route>
          <Route path="/unsubscribe/:randomString">
            <Unsubscribe />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      <Footer />
    </div>
  );
}

export default AppUser;




