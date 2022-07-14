import React, { useState, useEffect, useRef } from 'react';
import { getAllTemplates, deleteSpecificTemplate } from "../../services/mails.js";

function EditEmail() {
    const [templates, setTemplates] = useState([]);
    const mounted = useRef(true);

    useEffect(() => {
        document.title = "Search Email Template | Curly Haired Escapade"
    }, [])

    useEffect(() => {
        mounted.current = true;
        getAllTemplates()
            .then(items => {
                if (mounted.current) {
                    setTemplates(items)
                }
            })
        return () => mounted.current = false;
    }, [])


    function handleDelete(templateId) {
        deleteSpecificTemplate(templateId)
            .then(() => {
            })
    }

    return (
        <div className="centered">
            <h1 className="text-center">Search Email Template</h1>
            <div className="list-group text-center">
                {
                    templates.map(template => {
                        return (
                            <div key={template._id}>
                                <a href={`/admin/dashboard/email/edit/${template._id}`} className="list-group-item list-group-item-action email-search ">
                                    {template.name}
                                </a><button type="button" className="btn btn-danger email-delete" onClick={() =>
                                    handleDelete(template._id)
                                }>Delete</button>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default EditEmail;