import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { editSpecificEmail } from "../../services/mails";
import Loading from '../loading';

function Unsubscribe() {
    const [done, setDone] = useState(false);    
    const [loading, setLoading] = useState(false);
    const { randomString } = useParams();
    useEffect(() => {
        document.title = "Unsubscribe | Curly Haired Escapade"
    }, [])

    useEffect(() => {
        setLoading(true);
        editSpecificEmail(randomString, false)
            .then((data) => {
                setLoading(false);
                if (data.success) {
                    setDone(true);
                }
                else {
                    setDone(false);
                }
            })
    }, [randomString]);
    return (
        <div className="page">
            {loading ? <div className="email-loading"><Loading loading={loading} /></div> :
               <div>
           { done ? <h2 className="text-center">You Have Unsubscribed From Our Newsletter.
                </h2> :
                <h2 className="text-center">Please Try Again!!
                    </h2>
                    
        }
        </div>
        }
        </div>

    )
}

export default Unsubscribe;