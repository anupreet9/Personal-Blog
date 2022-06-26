import React, { useEffect, useRef, useState } from 'react';
import { getPost, deleteSpecificPost } from '../../services/posts';

function SearchPosts() {
    const [post, setPost] = useState([]);
    const mounted = useRef(true);

    useEffect(() => {
        document.title = "Search Blog Post | Curly Haired Escapade"
    }, [])

    useEffect(() => {
        mounted.current = true;
        if (post.length) {
            return;
        }
        getPost()
            .then(items => {
                if (mounted.current) {
                    setPost(items)
                }
            })
        return () => mounted.current = false;
    }, [post])

    function handleDelete(postId) {
        deleteSpecificPost(postId)
            .then(() => {
                window.location.reload(true);
            })
    }
    return (
        <div className="centered">
            <h1 className="text-center">Search Your Post</h1>
            <div className="card-deck">
                <div className="row">
                    {post.map(item => {
                        return (
                            <div key={item._id} className="admin-posts">
                                <div className="card">
                                    <img className="card-img-top" src={item.displayImage} alt="Card" />
                                    <div className="card-img-overlay">
                                        <h5 className="admin-card-title">{item.title}</h5>
                                    </div>
                                </div>
                                <p className="admin-card-text"><small>{`Written By ${item.author} on ${item.d} ${item.m}, ${item.y}`}</small></p>
                                <div className="postButtons">
                                    <a type="button" className="btn btn-primary" href={`/admin/dashboard/comments/${item._id}`}>Comments</a>
                                    <a type="button" className="btn btn-primary" href={`/admin/dashboard/edit/${item._id}`}>Edit</a>
                                    <button className="btn btn-danger" onClick={() =>
                                        handleDelete(item._id)
                                    }>Delete</button>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}
export default SearchPosts;