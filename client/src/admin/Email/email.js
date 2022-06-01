import React from 'react';

function Email() {
    return (
        <div>
            <a className="btn btn-secondary btn-lg dashboard-btn" href="/admin/dashboard/email/add" type="button">Add Email Template</a>
            <a className="btn btn-secondary btn-lg dashboard-btn" href="/admin/dashboard/email/search" type="button">Search & Edit Email Template</a>
            <a className="btn btn-secondary btn-lg dashboard-btn" href="/admin/dashboard/email/send" type="button">Send Email Newsletter</a>
            <a className="btn btn-secondary btn-lg dashboard-btn" href="/admin/dashboard/email/query" type="button">Send Query Email Reply</a>
            <a className="btn btn-secondary btn-lg dashboard-btn" href="/admin/dashboard/email/delete" type="button">Delete Subscribers</a>
        </div>
    )
}

export default Email;