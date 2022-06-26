import React, { useEffect } from 'react'
import Logout from "./logout";
import Email from "./Email/email";


function Dashboard(props) {

    useEffect(() => {
        document.title = "Admin Dashboard | Curly Haired Escapade"
    }, [])

    return (
        <div className="centered dashboard">
            <h1 className="welcome-note">Welcome Admin to Curly Haired Escapade!!</h1>
            <div className="btn-group-vertical dashboard-btns" role="group" aria-label="Basic example">
                <a className="btn btn-secondary btn-lg dashboard-btn" target="_blank" href="/posts" type="button">Go To Your Blog</a>
                <a className="btn btn-secondary btn-lg dashboard-btn" href="/admin/dashboard/search" type="button">See All Posts</a>
                <a className="btn btn-secondary btn-lg dashboard-btn" href="/admin/dashboard/add" type="button">Add Post</a>
                <Email />
                <Logout authenticated={props.authenticated}/>
            </div>
        </div>
    )
}

export default Dashboard;