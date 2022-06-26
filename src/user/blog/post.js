import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { getSpecificPost } from '../../services/posts';
import CommentBox from '../comment/CommentBox';
import CommentDisplay from '../comment/CommentDisplay';
import Share from '../share/share';
import Loading from '../loading';
import ShareMain from '../share/shareMain';
import Subscribe from '../emails/subscribe';
import { Helmet } from 'react-helmet'

function Post(props) {
    const [post, setPost] = useState({
        title: "",
        displayImage: "",
        author: "",
        m: "",
        y: "",
        d: "",
        content: "",
        like: ""
    });
    const mounted = useRef(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = `${post.title} | Curly Haired Escapade`;
    }, [post.title]);

    useEffect(() => {
        mounted.current = true;
        setLoading(true);
        getSpecificPost(props.postId)
            .then(items => {
                setLoading(false);
                if (mounted.current) {
                    setPost(items)
                }
            })
        return () => mounted.current = false;
    }, [props.postId]);

    return (
        <div>
            <Helmet>
                <title>
                    {post.title} | Curly Haired Escapade
                </title>
                <meta name="description" content={post.description} data-react-helmet="true"/>
            </Helmet>
            <div className="post" > {
                loading ? <div className="posts-loading"><Loading loading={loading} /></div> :
                    <div >
                        <div className="post-image" >
                            <img className="post-image"
                                src={post.displayImage}
                                alt="Card" />
                            <p className="post-title" > {post.title} </p>
                            <p className="post-text" >
                                <small>
                                    <i> {`Posted By ${post.author} on ${post.d} ${post.m} , ${post.y}`}
                                    </i>
                                </small>
                            </p>
                        </div>
                        <div className="post-body" > {ReactHtmlParser(post.content)} </div>
                        <div className="" >
                            <Share postId={props.postId}
                                likes={post.like}
                            />
                        </div>
                        <CommentDisplay postId={props.postId} />
                        <CommentBox postId={props.postId} type="comment" postTitle={post.title}/>
                        <div className="pb-5" > </div>
                        <div className="share-post-main">
                            <img className="share-post-img" src="https://i.ibb.co/6NT2VDQ/Untitled-1-November-2020-01-43-14.jpg" alt="Untitled-1-November-2020-01-43-10" border="0"></img>
                            <div className="share-post">
                                <Subscribe />
                                <ShareMain
                                    img={post.displayImage}
                                    descr={post.title} />
                            </div>
                        </div>
                    </div>
            }
            </div>


        </div>
    )
}
export default Post;