import React, { useState, useEffect, useRef } from 'react';
import { sendEmail } from '../../services/mails';
import './index.css';
import Share from '../share/shareMain'
import validator from 'validator'
import Subscribe from '../emails/subscribe';
import Loading from '../loading';
import { Helmet } from 'react-helmet'

function Contact() {
    const [info, setInfo] = useState({
        name: "",
        email: "",
        query: ""
    });
    const [emailError, setEmailError] = useState({
        text: '',
        state: false
    });
    const [alert, setAlert] = useState(false);
    const mounted = useRef(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Contact | Curly Haired Escapade"
    }, [])

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                if (mounted.current) {
                    setAlert(false)
                }
            }, 6000)
        }
    }, [alert]);

    function handleChange(event) {
        const { value, name } = event.target;
        setInfo((prevValues) => {
            return { ...prevValues, [name]: value }
        });

        if (validator.isEmail(info.email)) {
            setEmailError({
                text: 'Valid Email',
                state: true
            })
        } else {
            setEmailError({
                text: 'Enter valid Email!',
                state: false
            })
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        if (emailError.state === false) {
            document.getElementById("span").classList.add("shake");
            return;
        }
        var emailInfo = {
            to: "curlyhairedescapade@gmail.com",
            subject: `Query from ${info.name}, ${info.email}`
        }
        var html = `<div>${info.query} <br/> To reply, <a href="http://curlyhairedescapade.com/admin/dashboard/email/query/?name=${info.name}&email=${info.email}&query=${info.query}">Click here</a>!!</div>`
        sendEmail(emailInfo.to, emailInfo.subject, html, null)
            .then(() => {
                setAlert(true);
                setLoading(false);
                setInfo({
                    name: "",
                    email: "",
                    query: ""
                });
                setEmailError({
                    text: '',
                    state: false
                })
            })
    }


    return (
        <div className="">
        <Helmet>
                <title>
                    Contact | Curly Haired Escapade
                </title>
                <meta name="description" content="Welcome to Curly Haired Escapade!!! For any queries or doubts you can fill the contact form. 
                                                  I will get back to you as soon as possible. " data-react-helmet="true" />
            </Helmet>
            <div className="contact">
                <img className="contact-img" src="https://i.ibb.co/588xgtk/Contact.jpg" alt="Contact" border="0"></img>
                {loading ? <div className="contact-loading"><Loading loading={loading} /></div> :
                    <div>
                        {alert ? <h2 className="text-center pt.3 pb.3 query-sent">  Your Query Is Sent To The Admin!!</h2> :
                            <form className="contact-form email-form">
                                <div className="form-group ">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Name" value={info.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" placeholder="Email" value={info.email} onChange={handleChange} required />
                                    <span id="span" className={emailError.state ? "error-msg-green" : "error-msg-red"}>{emailError.text}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="query">Query</label>
                                    <textarea className="form-control" placeholder="Enter your query here..." rows="4" cols="80" onChange={handleChange} name="query" value={info.query} required></textarea>
                                </div>
                                <div className="form-group contact-submit">
                                    <button type="submit" className="btn btn-dark contact-btn" onClick={handleSubmit}>Submit</button>
                                </div>
                            </form>
                        }
                    </div>
                }
            </div>
            <div className="share-contact-main">
                <img className="share-contact-img" src="https://i.ibb.co/grbCZDP/Untitled-1-November-2020-01-43-9.jpg" alt="Untitled-1-November-2020-01-43-9" border="0"></img>
                <div className="share-contact">
                    <Subscribe />
                    <Share img="https://i.ibb.co/8rWMGHN/Me.jpg"
                        descr="Curly Haired Escapade Blog" />
                </div>
            </div>
        </div>
    )
}

export default Contact;
