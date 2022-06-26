import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { editSpecificEmail, getSpecificEmail, getAllTemplates, sendEmail } from "../../services/mails";
import Loading from '../loading';

function Verify() {
    const [verified, setVerified] = useState(false);
    const { randomString } = useParams();
    const [emailTemplate, setEmailTemplate] = useState({
        to: "",
        subject: "",
        html: ""
    });
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Subscribe | Curly Haired Escapade"
    }, [])
    useEffect(() => {
        setLoading(true);
    }, []);

    useEffect(() => {
        getSpecificEmail(randomString)
            .then((data) => {
                setEmail(data.email)
                getAllTemplates()
                    .then(items => {
                        let template = Object.values(items).filter(item => item.name === "Welcome Email");
                        setEmailTemplate({
                            to: email,
                            subject: template[0].subject,
                            html: template[0].html
                        });
                        editSpecificEmail(randomString, true)
                            .then((data) => {
                                setLoading(false);
                                if (data.success) {
                                    setVerified(true);
                                }
                                else {
                                    setVerified(false);
                                }
                            })
                    })
            })
    }, [email, emailTemplate, randomString])

    useEffect(() => {
        if (!localStorage.getItem(randomString) && verified && email && emailTemplate.subject && emailTemplate.html) {
            localStorage.setItem(randomString, true);
            sendEmail(email, emailTemplate.subject, emailTemplate.html, null)
                .then((data1) => {
                    if (data1.success) {
                    }
                })
        }
    }, [verified, email, emailTemplate, randomString])


    return (
        <div className="page">
            {loading ? <div className="email-loading"><Loading loading={loading} /></div> :
                <div>
                    {verified ?
                        <div className="text-center"><h2>
                            Welcome to Curly Haired Newsletter. A Welcome Email is on Your Way!!
                        </h2>
                        </div> :
                        <div className="text-center"><h2>
                            Something Went Wrong. Go Back to Your Inbox and Try Clicking the Confirm Link Again.</h2>
                        </div>}
                </div>}

        </div>
    )
}

export default Verify;