import React, { useState, useEffect } from "react";
import { sendToRegister } from "../services/authenticate";

function Register() {
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        password: ""
    }
    );
    useEffect(() => {
        document.title = "Register | Curly Haired Escapade"
    }, [])

    function handleChange(event) {
        const { name, value } = event.target;
        setRegisterInfo(prevValues => {
            return {
                ...prevValues, [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        sendToRegister(registerInfo)
            .then((data) => {
                if (data.success) {
                    setRegisterInfo({
                        username: "",
                        password: ""
                    })
                    window.location.replace("/admin/login");
                }
            })
    }

    function urlChange() {
        window.location.replace("localhost:5000/auth/google");
    }

    return (
        <div>
            <div className="container mt-5">
                <h1>Register</h1>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" name="username" onChange={handleChange} value={registerInfo.username} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" name="password" onChange={handleChange} value={registerInfo.password} />
                                    </div>
                                    <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Register</button>
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
        </div>
    );
}
export default Register;