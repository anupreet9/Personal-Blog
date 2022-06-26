import React, { useEffect, useState, useRef } from 'react';
import { setItem, editSpecificComment } from '../../services/comment'


function CommentBox(props) {
    const [postId, setPostId] = useState(null);
    const [commentInfo, setCommentInfo] = useState({
        email: "",
        name: "",
        comment: ""
    }
    );
    const [alert, setAlert] = useState(false);
    const mounted = useRef(true);
    const [textAreaFocused, setTextAreaFocused] = useState(false);

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                if (mounted.current) {
                    setAlert(false);
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
    }

    function handleOnClick() {
        setPostId(props.postId);
        setTextAreaFocused(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
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
                    }
                })
        }
    }

    function toggleReplyBoxFunc() {
        props.toggleReplyBoxFunc(props.commentId);
    }

    return (
        <div className="comment-box">
            { alert ? <h1> Comment submitted </h1>
                :
                <div className="comment-form">
                    <h4 className="text-center" htmlFor="comment">Enter Reply</h4>
                    {props.type === "reply" && <button className="cancelbutton" onClick={toggleReplyBoxFunc}>Cancel reply</button>}
                    <br />
                    <div className="row">
                        <div className="card col-sm-8">
                            <div className="card-body">
                                <textarea placeholder="Enter your comment here..." rows="5" cols="80" onChange={handleChange} name="comment" value={commentInfo.comment} onClick={handleOnClick} required></textarea>
                                <br />
                                {textAreaFocused &&
                                    <div>
                                        <label>Fill in your details below:</label>
                                        <form>
                                            <div className="form-group">
                                                <input type="email" placeholder="Email(required)" className="form-control" name="email" onChange={handleChange} value={commentInfo.email} required />
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" name="name" placeholder="Name(required)" onChange={handleChange} value={commentInfo.name} required />
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" />
                                                <label className="form-check-label">Save my name, email, and website in this browser for the next time I comment.</label>
                                            </div>
                                            <br />
                                            <button type="submit" className="btn btn-dark postCommentButton" onClick={handleSubmit}>Post Reply</button>
                                        </form>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentBox;