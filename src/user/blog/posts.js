import React, { useEffect, useRef, useState } from 'react';
import { getPost } from '../../services/posts';
import Loading from '../loading';
import { Helmet } from 'react-helmet'

function Posts() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const mounted = useRef(true);

    useEffect(() => {
        document.title = "Posts | Curly Haired Escapade"
    }, [])

    useEffect(() => {
        mounted.current = true;
        if (post.length) {
            return;
        }
        setLoading(true)
        getPost()
            .then(items => {
                setLoading(false);
                if (mounted.current) {
                    let array = Object.values(items).slice(0).reverse().filter(item => item.edit === true);
                    setPost(array)
                }
            })
        return () => mounted.current = false;
    }, [post])

    // function handleClick(id) {
    //     var url = "/posts/" + id;
    //     window.location.replace(url);
    // }

    return (
        <div>
            <Helmet>
                <title>
                    Posts | Curly Haired Escapade
                </title>
                <meta name="description" content="Welcome to Curly Haired Escapade!!! I write blogs on fashion, food and lifestyle. 
                                                  Come follow me on my journey. " data-react-helmet="true"/>
            </Helmet>
            <div className="posts">
                <div className="card-deck">
                    <img className="posts-header" src="https://i.ibb.co/nBcvqXw/Posts.jpg" alt="posts-header-img" />
                    {loading ? <div className="posts-loading"><Loading loading={loading} /></div> :
                        <div className="row">
                            {post.length > 0 && post.map(item => {
                                return (
                                    <div key={item._id}>
                                        <div className="" style={{ paddingBottom: '20px' }}>
                                            <a href={`/posts/${item._id}`} style={{ display: 'block' }}>
                                                <div className="card" style={{ cursor: 'pointer' }}>
                                                    <img className="card-img-top" src={item.displayImage} alt="Card" />
                                                    <div className="card-img-overlay">
                                                        <h5 className="cards-title">{item.title}</h5>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
            <div className="pb-2"></div>
        </div>

    )
}
export default Posts;