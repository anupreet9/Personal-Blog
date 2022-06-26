import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useParams } from "react-router-dom";
import { getComments, deleteSpecificComment } from "../../services/comment"
import { editStatus } from "../../services/comment";
import CommentBox from "../../user/comment/CommentBox";
import EditBox from "./editBox";

function Comment() {

    useEffect(() => {
        document.title = "Comments/Replies | Curly Haired Escapade"
    }, [])

    const [comments, setComments] = useState([]);
    const [status, setStatus] = useState({
        status: {}
    });
    const [tagReply, setTagReply] = useState({
        opened: {}
    });
    const [tagApprove, setTagApprove] = useState({
        approved: {}
    });
    let { postId } = useParams();
    const [replies, setReplies] = useState({
        opened: {}
    });

    const [toggleReplyBox, setToggleReplyBox] = useState({
        opened: {}
    });

    const [editBox, setEditBox] = useState({
        opened: {}
    });
    let flag = useRef(false);

    const mounted = useRef(true);
    useEffect(() => {
        mounted.current = true;
        getComments()
            .then(allComments => {
                if (mounted.current) {
                    const array = Object.values(allComments).filter(comment => comment.postId === postId);
                    setComments(array);
                    flag.current = true;
                }
            })
        return () => {
            mounted.current = false;
        }
    }, [postId, comments]);

    function toggleReplyBoxFunc(id) {
        if (editBox.opened[id]) {
            toggleEditBox(id);
        }
        setToggleReplyBox({
            opened: {
                [id]: !toggleReplyBox.opened[id]
            }
        })
    }

    function toggleReply(id) {
        setTagReply({
            opened: {
                ...tagReply.opened,
                [id]: !tagReply.opened[id]
            }
        })
        setReplies({
            opened: {
                ...replies.opened,
                [id]: !replies.opened[id]
            }
        })
    }

    function toggleApprove(id, sentId) {
        setTagApprove({
            approved: {
                ...tagApprove.approved,
                [id]: !tagApprove.approved[id]
            }
        })
        currentStatus(tagApprove.approved[id] ? "Pending" : "Approved", id, sentId)
    }

    function currentStatus(text, id, sentId) {
        setStatus({
            status: {
                ...status.status,
                [id]: text
            }
        })
        if (text === "Trash") {
            if (id !== sentId) {
                deleteSpecificComment(sentId, true, id)
                    .then(() => {
                    })
            }
            else {
                deleteSpecificComment(sentId, false, null)
                    .then(() => {
                    })
            }

        }
        if (id !== sentId)
            sendToServer(text, sentId, true, id);
        else
            sendToServer(text, sentId, false, null);

    }

    function sendToServer(status, sentId, isReplyStatus, replyId) {
        editStatus(status, sentId, isReplyStatus, replyId)
            .then(() => {

            })
    }

    function toggleEditBox(id) {
        if (toggleReplyBox.opened[id]) {
            toggleReplyBoxFunc(id);
        }
        setEditBox({
            opened: {
                [id]: !editBox.opened[id]
            }
        })
    }

    return (
        <div className="table-container">
            <h2>Comments</h2>
            <table className=" table table-light">
                <thead className="thead-dark">
                    <tr>
                        <th>Author</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody className="table-hover">
                    {
                        comments.map(comment => {
                            return (
                                <Fragment key={comment._id}>
                                    <tr>
                                        <td className="name-row">
                                            <div className="thumb">
                                                <i className="fa fa-user" style={{ width: '30px', fontSize: '30px' }}></i>
                                            </div>
                                            <div className="desc">
                                                <h5 className="name">{comment.name}</h5>
                                                <p className="emails">
                                                    {comment.email}
                                                </p>
                                                <p className="date">{`${comment.d} ${comment.m} , ${comment.y}`}</p>
                                            </div>
                                        </td>
                                        <td className="comment" >
                                            <p>{comment.comment}</p>
                                            <p className="comment-status">Current Status: {comment.status}</p>
                                            <br />
                                            <div className="comment-cell btn-group btn-group-sm" role="group">
                                                <button className={tagReply.opened[comment._id] ? "btn btn-primary" : "btn btn-outline-primary"}
                                                    onClick={() => toggleReply(comment._id)}>{
                                                        tagReply.opened[comment._id] ? "Hide all replies" : "See all replies"
                                                    }</button>
                                                <button
                                                    className={tagApprove.approved[comment._id] ? "btn btn-warning" : "btn btn-outline-success"}
                                                    onClick={() => toggleApprove(comment._id, comment._id)}>
                                                    {tagApprove.approved[comment._id] ? "Unapprove" : "Approve"} </button>
                                                <button className={toggleReplyBox.opened[comment._id] ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => toggleReplyBoxFunc(comment._id)}>Reply</button>
                                                <button className={editBox.opened[comment._id] ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => { toggleEditBox(comment._id) }}>Edit</button>
                                                <button className={status.status[comment._id] === "Spam" ? "btn btn-danger" : "btn btn-outline-danger"} onClick={() => currentStatus("Spam", comment._id, comment._id)}>Spam</button>
                                                <button className={status.status[comment._id] === "Trash" ? "btn btn-danger" : "btn btn-outline-danger"} onClick={() => currentStatus("Trash", comment._id, comment._id)}>Trash</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" className="edit-comment" style={{ "border-top": "0px" }}>
                                            {toggleReplyBox.opened[comment._id] && <CommentBox type="reply" commentId={comment._id} postId={comment.postId} toggle={() => toggleReplyBoxFunc(comment._id)} />}
                                            {editBox.opened[comment._id] && <EditBox type="comment" comment={comment} commentId={comment._id} id={comment._id} toggleEditBox={toggleEditBox} />}

                                        </td>
                                    </tr>

                                    {comment.replies.map(reply => {
                                        return (
                                            <Fragment key={reply._id}>
                                                {replies.opened[comment._id] &&
                                                    <Fragment>
                                                        <tr className="replies">
                                                            <td className="name-row">
                                                                <div className="thumb">
                                                                    <i className="fa fa-user" style={{ width: '30px', fontSize: '30px' }}></i>
                                                                </div>
                                                                <div className="desc">
                                                                    <h5 className="name">{reply.name}</h5>
                                                                    <p className="emails">
                                                                        {reply.email}
                                                                    </p>
                                                                    <p className="date">{`${reply.d} ${reply.m} , ${reply.y}`}</p>
                                                                </div>
                                                            </td>
                                                            <td className="comment">
                                                                <p>{reply.comment}</p>
                                                                <p className="comment-status">Current Status: {reply.status}</p>
                                                                <br />
                                                                <div className="comment-cell btn-group btn-group-sm flex-wrap" role="group">
                                                                    <button type="button" className={tagApprove.approved[reply._id] ? "btn btn-warning" : "btn btn-outline-success"} onClick={() => toggleApprove(reply._id, comment._id)}>
                                                                        {tagApprove.approved[reply._id] ? "Unapprove" : "Approve"}
                                                                    </button>
                                                                    <button type="button" className={editBox.opened[reply._id] ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => toggleEditBox(reply._id)}>Edit</button>
                                                                    <button type="button" className={status.status[reply._id] === "Spam" ? "btn btn-danger" : "btn btn-outline-danger"} onClick={() => currentStatus("Spam", reply._id, comment._id)} >Spam</button>
                                                                    <button type="button" className={status.status[reply._id] === "Trash" ? "btn btn-danger" : "btn btn-outline-danger"} onClick={() => currentStatus("Trash", reply._id, comment._id)}>Trash</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2" className="edit-comment">
                                                                {editBox.opened[reply._id] && <EditBox type="reply" comment={reply} commentId={comment._id} id={reply._id} toggleEditBox={toggleEditBox} />}

                                                            </td>
                                                        </tr>
                                                    </Fragment>

                                                }

                                            </Fragment>
                                        )
                                    })}
                                </Fragment>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default Comment;