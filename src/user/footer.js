import React from 'react'

function Footer() {
    return (
        <div className="footer">
            <hr className="line" />
            <h5 className="subtitle"> A regular curly haired</h5>
            <h6 className="connect-title"><i>Connect with us</i></h6>
            <div className="icons">
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/CurlyHairedEscapade" className="facebook"><i className="fab fa-facebook fa-2x"></i></a>
                <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/curlyhairedescapade?utm_medium=copy_link" className="instagram"><i className="fab fa-instagram fa-2x"></i></a>
                <a target="_blank" rel="noopener noreferrer" href="https://mail.google.com/mail/?view=cm&fs=1&to=curlyhairedescapade@gmail.com" className="email"><i className="fas fa-envelope fa-2x"></i></a>
            </div>
            <div className="spacer"></div>
        </div>
    )
}

export default Footer;