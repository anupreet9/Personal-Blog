import React, { useState, useEffect } from "react";
import { sendToLogin } from "../services/authenticate";
import domain from './domain'

function Login() {
    useEffect(() => {
        document.title = "Login | Curly Haired Escapade"
    }, [])

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    }
    );

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginInfo(prevValues => {
            return {
                ...prevValues, [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        sendToLogin(loginInfo)
            .then((data) => {
                if (data.success) {
                    setLoginInfo({
                        username: "",
                        password: ""
                    })
                    window.location.replace("/admin/dashboard");
                }
            })
    }

    function urlChange() {
        window.location.replace(domain+ "/auth/google");
    }

    return (
        <div className="container mt-5">

            <h1>Login</h1>
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="username" onChange={handleChange} value={loginInfo.username} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" onChange={handleChange} value={loginInfo.password} />
                                </div>
                                <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <button className="btn btn-block btn-social btn-google" onClick={urlChange}>
                                <i className="fab fa-google"></i>
                                           Sign In with Google
                                   </button>
                        </div>
                    </div>
                </div>

            </div>



        </div>


    );
}
export default Login;