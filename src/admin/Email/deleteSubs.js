import React, { useState, useEffect, useRef } from 'react';
import { getAllEmails, deleteSpecificEmail } from '../../services/mails';

function DeleteSubs() {
    const [subs, setSubs] = useState([]);
    const mounted = useRef(true);

    useEffect(() => {
        document.title = "Delete Newletter Subscribers | Curly Haired Escapade"
    }, [])

    useEffect(() => {
        mounted.current = true;
        getAllEmails()
            .then(items => {
                if (mounted.current) {
                    setSubs(items)
                }
            })
        return () => mounted.current = false;
    }, [subs])

    function handleDelete(randomString) {
        deleteSpecificEmail(randomString)
            .then(() => {
            })
    }

    return (
        <div className="centered">
            <h1 className="text-center">Email Newsletter Subscribers</h1>
            <div className="list-group text-center">
                {
                    subs.map(sub => {
                        return (
                            <div key={sub.randomString}>
                                <div className="list-group-item email-search text-wrap">
                                    {sub.email}
                                </div>
                                <button type="button" className="btn btn-danger email-delete" onClick={() =>
                                    handleDelete(sub.randomString)
                                }>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DeleteSubs;