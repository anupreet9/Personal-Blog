import React, { useEffect } from 'react';
import './index.css';
import Share from '../share/shareMain';
import Subscribe from '../emails/subscribe';
import { Helmet } from 'react-helmet'

function About() {
    useEffect(() => {
        document.title = "About | Curly Haired Escapade"
    }, [])
    return (
        <div>
            <Helmet>
                <title>
                    About | Curly Haired Escapade
                </title>
                <meta name="description" content="Welcome to Curly Haired Escapade!!! I am a regular girl. So what's the meaning of regular for me? What Nothing different, I find happiness in regular things, like cooking a new recipe, wearing a new dress,
                        talking to my friends, sometimes ordering food from outside, making someone smile... " data-react-helmet="true"/>
            </Helmet>

            <div className="about">
                <img className="about-header" src="https://i.ibb.co/MDHxSsX/About.jpg" alt="aboutMeText" />
                <h4 className="about-title">Welcome to Curly Haired Escapade!!!</h4>
                <div className="para about-para"> I am a regular girl. So what's the meaning of "regular" for me?
                    <div className="about-para">
                        Nothing different, I find happiness in regular things, like cooking a new recipe, wearing a new dress,
                        talking to my friends, sometimes ordering food from outside, making someone smile...
                    </div>
                    <div className="about-para">
                        In our lives what lies ahead of us, we have no way of
                        knowing..but If we try to find happiness in small regular things that happens around us, happiness will always find its way to us and no matter if we are still in oblivion but at least we will be happy...
                    </div>
                    <img className="about-img" src="https://i.ibb.co/8rWMGHN/Me.jpg" alt="aboutMe" />

                    <div className="about-para">
                        This page is like my escapade, an attempt to escape my 9-5 and share the regular things that make me
                        happy with you.
                        And to be honest, being in oblivion is difficult and for an over-thinker like me its more difficult, right now I am thinking about my next 5 years and already I have like 50 different ideas of what my next 5 years will look like..
                        But one thing is certain..life is too short to stand around and think..the only solution is to keep going forward and see what life has to offer us..
                    </div>
                    <div className="about-para-imp">
                        Follow along on my journey and see me attempt to escape my 9-5 by doing things I love!!
                        Don't forget to subscribe to my newletter and connect with me on instagram and facebook.                    </div>
                    <div className="about-para">
                        - A regular curly haired
                    </div>
                </div>
            </div>
            <div className="share-about-main">
                <img className="share-about-img" src="https://i.ibb.co/Fmtp52q/Untitled-1-November-2020-01-43-10.jpg" alt="Untitled-1-November-2020-01-43-10" border="0"></img>
                <div className="share-about">
                    <Subscribe />
                    <Share img="https://i.ibb.co/8rWMGHN/Me.jpg"
                        descr="Curly Haired Escapade Blog" />
                </div>
            </div>
        </div>
    )
}

export default About;