import React, { useEffect } from 'react'
import Slideshow from './slideshow'
import './index.css'
import Subscribe from "../emails/subscribe"
import { Helmet } from 'react-helmet'

function Home() {
    useEffect(() => {
        document.title = "Home | Curly Haired Escapade"
    }, [])

    return (
        <div>
        <Helmet>
                <title>
                    Home | Curly Haired Escapade
                </title>
                <meta name="description" content="Welcome to Curly Haired Escapade!!! I am a regular girl. So what's the meaning of regular for me? What Nothing different, I find happiness in regular things, like cooking a new recipe, wearing a new dress,
                        talking to my friends, sometimes ordering food from outside, making someone smile... " data-react-helmet="true" />
            </Helmet>
            <img src="https://i.ibb.co/3CffcMN/cover.jpg" className="cover-pic sketchy" alt="cover-pic" border="0"></img>
            <h4 className="home-posts">Latest Posts</h4>
            <Slideshow />
            <div className="home-contact text-center">
                <img className="home-contact-img" src="https://media.giphy.com/media/GWYIr9KFkr8Yfv9j7j/giphy.gif" alt="contact-img"></img>
                <p className="home-contact-title">For any query:</p>
                <a type="button" className="home-contact-link btn" href="http://curlyhairedescapade.com/contact">Contact Us</a>
            </div>
            <div className="home-share">
                <div className="home-share-img-div">
                    <img className="home-share-img" src=" https://media.giphy.com/media/hsP7gLSSpg9TQPyC66/giphy.gif" alt="share-img"></img>
                </div>
                <div className="home-share-title"><Subscribe /></div>

            </div>
        </div>
    )
}

export default Home;