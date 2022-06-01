import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import Comment from './Comment';
import { getComments } from "../../services/comment";
import Reply from "./Reply";

function CommentDisplay(props) {
    const [comments, setComments] = useState([]);
    const mounted = useRef(true);
    const [replyBox, setReplyBox] = useState({
        opened: {}
    });
    useEffect(() => {
        mounted.current = true;
        getComments()
            .then(comments => {
                if (mounted.current) {
                    let array = Object.values(comments).filter(comment => comment.postId === props.postId);
                    array = Object.values(array).filter(comment => comment.status === "Approved");
                    setComments(array);
                }
            })
        return () => mounted.current = false;
    }, [props.postId])
    const length = comments.length;
    function toggle(id) {
        setReplyBox({
            opened: {
                [id]: !replyBox.opened[id]
            }
        })
    }
    return (
        <div className="comments-area">
            <h5>{length} Comments</h5>
            <hr className="line-break" />
            <div className="comment-list">
                {comments.length !== 0 && comments.map(comment => {
                    return (
                        <div key={comment._id}>
                            <Comment comment={comment} toggle={() => toggle(comment._id)} opened={replyBox.opened} />
                            {comment.replies.length !== 0 && comment.replies.map(reply => {
                                return (
                                    <div key={reply._id}>
                                        {reply.status === 'Approved' && <div className="comment-list left-padding ">
                                            <Reply reply={reply} commentId={comment._id} toggle={() => toggle(reply._id)} opened={replyBox.opened} />
                                        </div>}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div >
    )
}
export default CommentDisplay;