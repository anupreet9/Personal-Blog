import React from 'react';
import './index.css';

function ShareMain(props) {

    const loc = window.location.href;

    const FBurl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(loc) + "&quote=" + props.descr + "&images=" + props.img;
    const WPurl = "https://api.whatsapp.com/send?text=Hi, I loved curly haired escapade blog. Sharing it with you.... " + loc;
    const PTurl = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(loc) + "&media=" + props.img + "&description=" + props.descr;
    return (
        <div className="share text-center">
            <h6 className="share-title">Share the blog on:</h6>
            <div className="icons text-center">
                <a target="_blank" rel="noopener noreferrer" href={WPurl} className="whatsapp"><i className="fab fa-whatsapp fa-2x"></i></a>
                <a target="_blank" rel="noopener noreferrer" href={PTurl} className="pinterest" data-pin-do="embedPin"><i className="fab fa-pinterest fa-2x"></i></a>
                <a target="_blank" href={FBurl} rel="noopener noreferrer" className="facebook"><i className="fab fa-facebook fa-2x"></i></a>
            </div>
        </div>
    )
}

export default ShareMain;