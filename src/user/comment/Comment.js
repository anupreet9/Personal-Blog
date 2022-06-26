import React from 'react';
import CommentBox from './CommentBox';

function Comment(props) {
    const comment = props.comment;
    return (
        <div>
            <div className="thumb">
                <i className="fa fa-user" style={{ width: '30px', fontSize: '30px' }}></i>
            </div>
            <div className="desc">
                <h5>{comment.name}</h5>
                <i className="date">{`${comment.d} ${comment.m} , ${comment.y}`}</i>
            </div>
            <p className="comment left-padding">
                {comment.comment}
            </p>
            <button className="btn-reply left-padding" onClick={() => props.toggle(comment._id)}>Reply</button>
            <hr className="comment-break" />
            <div className={props.opened[comment._id] ? "replyBox-open" : "replyBox-close"}>
                <CommentBox type="reply" commentId={comment._id} toggle={() => props.toggle(comment._id)} id={comment._id} />
            </div>
        </div>
    )
}
export default Comment;