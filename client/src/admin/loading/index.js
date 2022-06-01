import React from 'react';
import './index.css';

function Loading(props) {
    return (
        <div>
            {props.loading && <div className="box"><div className="loader inner-circles-loader posts-header"></div></div>}
        </div>
    )
}

export default Loading;