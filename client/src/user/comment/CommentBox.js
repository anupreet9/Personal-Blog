import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import { setItem, editSpecificComment } from '../../services/comment'
import validator from 'validator'
import { sendEmail } from '../../services/mails';

function CommentBox(props) {
    const [postId, setPostId] = useState(null);
    const n = localStorage.getItem("name");
    const e = localStorage.getItem("email");
    const [commentInfo, setCommentInfo] = useState({
        email: e,
        name: n,
        comment: ""
    }
    );
    const [emailError, setEmailError] = useState({
        text: '',
        state: false
    });
    const [alert, setAlert] = useState(false);
    const mounted = useRef(true);
    const [textAreaFocused, setTextAreaFocused] = useState(false);

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                if (mounted.current) {
                    setAlert(false);
                    if (props.type === "reply")
                        props.toggle(props.id);
                }
            }, 2000)
        }
    }, [alert, props]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCommentInfo(prevValues => {
            return {
                ...prevValues, [name]: value
            }
        })

        if (commentInfo.email!=null && validator.isEmail(commentInfo.email)) {
            setEmailError({
                text: 'Valid Email',
                state: true
            })
        } else {
            setEmailError({
                text: 'Enter Valid Email!',
                state: false
            })
        }
    }

    function handleOnClick() {
        setPostId(props.postId);
        setTextAreaFocused(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (emailError.state === false) {
            document.getElementById("span").classList.add("shake");
            return;
        }

        var emailInfo = {
            to: "curlyhairedescapade@gmail.com",
            subject: `New comment added by ${commentInfo.name}, ${commentInfo.email}`
        }
        var html = `<div>New comment on ${props.postTitle} <br/> Check it out on, <a href="https://curlyhairedescapade.herokuapp.com/admin/dashboard/comments/${postId}">Click here</a>!!</div>`
        sendEmail(emailInfo.to, emailInfo.subject, html, null)
            .then(() => {
            })

        if (props.type === "reply") {
            editSpecificComment(props.commentId, commentInfo)
                .then(() => {
                    if (mounted.current) {
                        setTextAreaFocused(false);
                        setAlert(true);
                        setCommentInfo({
                            email: "",
                            name: "",
                            comment: ""
                        }
                        );
                        setEmailError({
                            text: '',
                            state: false
                        })
                    }
                }
                )
        }
        if (props.type === "comment") {
            setItem(commentInfo, postId)
                .then(() => {
                    if (mounted.current) {
                        setTextAreaFocused(false);
                        setAlert(true);
                        setCommentInfo({
                            email: "",
                            name: "",
                            comment: ""
                        }
                        );
                        setEmailError({
                            text: '',
                            state: false
                        })
                    }
                })
        }
    }

    function toggle() {
        props.toggle(props.id);
    }

    function handleCheck() {
        localStorage.setItem("name", commentInfo.name);
        localStorage.setItem("email", commentInfo.email);
    }

    return (
        <div>
            {alert ? <h1 id="submit" className="comment-submit"> Comment submitted </h1>
                :
                <div className="comment-form">
                    <label htmlFor="comment">We are waiting to hear your thoughts on this post:</label>
                    {props.type === "reply" && <button className="cancelButton" onClick={toggle}>Cancel reply</button>}
                    <textarea placeholder="Enter your comment here..." rows="3" cols="40" onChange={handleChange} name="comment" value={commentInfo.comment} onClick={handleOnClick} required></textarea>
                    <br />
                    {textAreaFocused &&
                        <div className="opened-box">
                            <label className="label-comment">Fill in your details below:</label>
                            <form>
                                <div className="thumb">
                                    <i className="fa fa-user" style={{ width: '20px', fontSize: '20px' }}></i>
                                </div>
                                <input className="emails" placeholder="Email(required)" name="email" onChange={handleChange} value={commentInfo.email} required />
                                <span id="span" className={emailError.state ? "error-msg-green" : "error-msg-red"}>{emailError.text}</span>
                                <input className="name" name="name" placeholder="Name(required)" onChange={handleChange} value={commentInfo.name} required />
                                <br />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" onClick={handleCheck} />
                                    <label className="form-check-label">Save my name and email in this browser for the next time I comment.</label>
                                </div>
                                <br />
                                <a className="btn btn-dark post-button" href="#submit" onClick={handleSubmit}>Post Comment</a>
                            </form>
                        </div>}
                </div>

            }
        </div>
    )
}

export default CommentBox;


