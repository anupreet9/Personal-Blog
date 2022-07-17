import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import "./index.css";
import Add from './Post/addPost';
import EditPost from "./Post/editPost";
import SearchPost from "./Post/searchPost";
import ProtectedRoute from "./protectedRoute";
import Dashboard from './dashboard';
import Comment from './Comment/commentButton';
import AddEmail from './Email/addEmail';
import EditEmail from './Email/editEmail';
import SendEmail from './Email/sendEmail';
import SearchEmail from './Email/searchEmail';
import DeleteEmail from './Email/deleteSubs';
import SendEmailQuery from './Email/sendQueryEmail';
import NotFoundPage from './Notfound'
import { authenticate } from '../services/authenticate.js'
import Loading from './loading/index'

function Admin() {
    const [authenticated, setAuthenticated] = useState(true);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        authenticate()
            .then(data => {
                if (data.success) {
                    setAuthenticated(true)
                }
                else {
                    setAuthenticated(false)
                }
                setLoading(false)
            })
    }, [authenticated]);

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
        <React.Fragment>
            <div className="wrapper">
                <nav id="sidebar" className="slide-in">
                    <button className="btn" id="dismiss" onClick={handleBack}>
                        <i className="icon-back fas fa-arrow-left"></i>
                    </button>
                    <img className="logo-img" src="https://i.ibb.co/q07rnNh/Untitled-1-November-2020-01-43-36-6.jpg" alt="logo"></img>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link-side nav-link text-center" href="/admin/dashboard">Go To Dashboard</a>
                        </li>
                    </ul>
                    <div className="spacerr">
                    </div>
                </nav>
                <nav className="navbar navbar-expand-md " >
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
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link navigation-link" href="/admin/dashboard">Go To Dashboard</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div id="overlay" className="overlay" onClick={handleBack}></div>

                <Router>
                    {loading ? <div className="loading"><Loading loading={loading} /> </div> :
                        <Switch>
                            <Route exact path="/admin/register">
                                <Register />
                            </Route> 
                            <Route exact path="/admin/login">
                                <Login authenticated={authenticated} />
                            </Route>
                            <Route exact path="/admin">
                                <a className="btn btn-dark btn-lg register-btn" href="/admin/register" role="button" disabled>Register</a>
                                <a className="btn btn-dark btn-lg login-btn" href="/admin/login" role="button">Login</a>
                            </Route>
                            <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} authenticated={authenticated} />
                            <ProtectedRoute exact path="/admin/dashboard/add" component={Add} authenticated={authenticated} />
                            <Route exact path="/admin/dashboard/edit/:postId">
                                <ProtectedRoute component={EditPost} authenticated={authenticated} />
                            </Route>
                            <Route exact path="/admin/dashboard/comments/:postId">
                                <ProtectedRoute component={Comment} authenticated={authenticated} />
                            </Route>
                            <ProtectedRoute exact path="/admin/dashboard/search" component={SearchPost} authenticated={authenticated} />
                            <Route exact path="/admin/dashboard/email/add">
                                <ProtectedRoute component={AddEmail} authenticated={authenticated} />
                            </Route>
                            <Route exact path="/admin/dashboard/email/search">
                                <ProtectedRoute component={SearchEmail} authenticated={authenticated} />
                            </Route>
                            <Route exact path="/admin/dashboard/email/query">
                                <ProtectedRoute component={SendEmailQuery} authenticated={authenticated} />
                            </Route>
                            <Route exact path="/admin/dashboard/email/send">
                                <ProtectedRoute component={SendEmail} authenticated={authenticated} />
                            </Route>
                            <Route exact path="/admin/dashboard/email/edit/:templateId">
                                <ProtectedRoute component={EditEmail} authenticated={authenticated} />
                            </Route>
                            <Route exact path="/admin/dashboard/email/delete">
                                <ProtectedRoute component={DeleteEmail} authenticated={authenticated} />
                            </Route>
                            <Route path="*">
                                <NotFoundPage />
                            </Route>
                        </Switch>
                    }
                    <div className="Footer">
                    </div>
                </Router>
            </div>
        </React.Fragment>
    )
}

export default Admin;





