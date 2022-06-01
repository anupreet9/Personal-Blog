import React, { useState, useRef, useEffect } from 'react';
import { editPartOfCommentOrReply } from "../../services/comment";

function EditBox(props) {
    const comment = props.comment;
    const [commentInfo, setCommentInfo] = useState({
        name: comment.name,
        email: comment.email,
        comment: comment.comment
    });
    const [alert, setAlert] = useState(false);
    const mounted = useRef(true);



    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                if (mounted.current) {
                    setAlert(false);
                }
            }, 1000)
        }
    }, [alert]);

    function handleChange(event) {
        const { value, name } = event.target;
        setCommentInfo((prevValues) => {
            return { ...prevValues, [name]: value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (props.type === "comment") {
            editPartOfCommentOrReply(commentInfo, props.commentId, false, null, false)
                .then(() => {
                    if (mounted.current) {
                        setAlert(true);
                    }
                    toggleEditBox()
                })
        }
        else {
            editPartOfCommentOrReply(commentInfo, props.commentId, false, props.id, true)
                .then(() => {
                    if (mounted.current) {
                        setAlert(true);
                    }
                    toggleEditBox()
                })
        }

    }

    function toggleEditBox() {
        props.toggleEditBox(props.id)
    }

    return (
        <div className="edit-box">
            <hr />
            <h4 className="text-center">Edit Comment/Reply</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange} value={commentInfo.name} id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={handleChange} value={commentInfo.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment/Reply</label>
                    <textarea id="comment" className="form-control" rows="2" cols="80" onChange={handleChange} name="comment" value={commentInfo.comment} />
                </div>
                <div className="form-group">
                    {alert && <h2> Submit Successful</h2>}
                    <input type="submit" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditBox;












