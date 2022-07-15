import React, { useState, useEffect } from 'react'
import { setEmailInfo, sendEmail, getAllTemplates, getSpecificEmail } from '../../services/mails';
import validator from 'validator'
import './index.css';
import Loading from '../loading';

function Subscribe() {
    const randomStr = () => {
        const len = 8;
        let randStr = '';
        for (let i = 0; i < len; i++) {
            const ch = Math.floor((Math.random() * 10) + 1)
            randStr += ch
        }
        return randStr
    }
    const [email, setEmail] = useState({
        emailAddress: "",
        randomString: randomStr()
    });
    const [emailError, setEmailError] = useState({
        text: '',
        state: false
    });
    const [flag, setFlag] = useState(false);
    const [flag1, setFlag1] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [emailTemplate, setEmailTemplate] = useState({
        to: "",
        subject: "",
        html: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
        if (flag && !flag2 && emailTemplate.to && emailTemplate.subject && emailTemplate.html) {
            sendEmail(emailTemplate.to, emailTemplate.subject, emailTemplate.html, email.randomString)
                .then(() => {
                })
        }
    }, [flag, emailTemplate, flag2, email.randomString]);

    useEffect(() => {
        getAllTemplates()
            .then(items => {
                let template = Object.values(items).filter(item => item.name === "Confirmation Email");
                setEmailTemplate({
                    to: email.emailAddress,
                    subject: template[0].subject,
                    html: template[0].html
                });
            });
    }, [email]);

    function handleChange(event) {
        const { value, name } = event.target;
        setEmail((prevValues) => {
            return { ...prevValues, [name]: value }
        });
        if (validator.isEmail(email.emailAddress)) {
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

    function handleSubscribe() {
        setLoading(true);
        setEmailInfo(email)
            .then((data) => {
                if (data.success) {
                    setFlag(true);
                }
                else if (data.success1) {
                    getSpecificEmail(email.randomString)
                        .then((data) => {
                            if (!data.confirm) {
                                setFlag(true);
                            }
                            else {
                                setLoading(false);
                                setFlag(true);
                                setFlag2(true);
                            }
                        })
                }
                else {
                    setLoading(false);
                    setFlag(false);
                    setFlag1(true);
                }
            })
    }

    return (
        <div>
            {loading ? <div className="email-loading"><Loading loading={loading} /></div> :
                <div>
                    {flag ? flag2 ? <div>This email is already subscribed to our newsletter!!</div> :
                        <div>Success! An email was just sent to confirm your subscription.
               <p> Please find the email now and click 'Confirm' to start subscribing.</p></div> :
                        <div className="subscribe">
                            <h6 className="subscribe-title">Enter your email address to subscribe to this blog:</h6>
                            <div className="subscribe-input input-block-level">
                                <input className="form-control" type="email" name="emailAddress" placeholder="Email address" value={email.emailAddress} onChange={handleChange} />
                                <br />
                                <span className={emailError.state ? "error-msg-green" : "error-msg-red"}>{emailError.text}</span>
                                <br />
                                <button className="btn btn-dark subscribe-btn" onClick={handleSubscribe}>Subscribe</button>
                            </div>
                            {flag1 && <span>Something went wrong. Try again!!</span>}
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Subscribe;