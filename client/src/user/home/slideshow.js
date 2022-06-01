import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import { getPost } from '../../services/posts';
import Loading from '../loading';

function Slideshow() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        if (post.length) {
            return;
        }
        setLoading(true);
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

    var settings = {
        arrows: true,
        dots: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    draggable: true
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    draggable: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    draggable: true
                }
            }
        ]

    };

    return (
        <div className="gcontainer">
            {loading ? <div className="home-loading"><Loading loading={loading} /></div> :
                <Slider {...settings}>
                    {post.length > 0 && post.map(item => {
                        return (
                            <a href={`/posts/${item._id}`} style={{ display: 'block' }}>
                                <div key={item._id} className="card-image">
                                    <img src={item.displayImage} alt="display-img" />
                                    <p className="card-title">{item.title}</p>
                                </div>
                            </a>
                        )
                    })
                    }
                </Slider>
            }
        </div>
    )
}

export default Slideshow;
