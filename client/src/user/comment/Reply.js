import React from 'react';
import CommentBox from './CommentBox';

function Reply(props) {
    const reply = props.reply;
    return (
        <div>
            <div className="thumb">
                <i className="fa fa-user" style={{ width: '30px', fontSize: '30px' }}></i>
            </div>
            <div className="desc">
                <h5>{reply.name}</h5>
                <i className="date">{`${reply.d} ${reply.m} , ${reply.y}`}</i>
            </div>
            <p className="comment left-padding">
                {reply.comment}
            </p>
            <button className="btn-reply left-padding" onClick={() => props.toggle(reply._id)}>Reply</button>
            <hr className="comment-break" />
            {
                props.opened[reply._id] &&
                <CommentBox type="reply" commentId={props.commentId} toggle={() => props.toggle(reply._id)} id={reply._id} />
            }
        </div>
    )
}
export default Reply;