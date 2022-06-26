import React, { useState, useEffect } from 'react'
import { editPostLikes, getSpecificPost } from "../../services/posts";
import './index.css';

function Share(props) {
    const [like, setLike] = useState(0);
    const [flag, setFlag] = useState(localStorage.getItem(props.postId) === null ? false : true);

    useEffect(() => {
        getSpecificPost(props.postId)
            .then(post => {
                setLike(post.like);
            })
        return () => {
        };
    }, [props.postId]);

    function handleLike() {
        setLike(like + 1);
        setFlag(true)
        localStorage.setItem(props.postId, true)
        editPostLikes(props.postId, like + 1)
            .then(() => {
            })
    }

    function handleUnlike() {
        setLike(like - 1);
        setFlag(false);
        localStorage.setItem(props.postId, false)
        editPostLikes(props.postId, like - 1)
            .then(() => {
            })
    }

    return (
        <div className="share text-center">
            <h6>{like} Likes</h6>
            <hr />
            {
                flag ? <button className="btn hearts" onClick={handleUnlike}><i className="fas fa-heart"> Liked by you</i></button> : <button className="btn heart" onClick={handleLike}><i className="fas fa-heart"> Like</i></button>
            }
        </div>
    )
}

export default Share;