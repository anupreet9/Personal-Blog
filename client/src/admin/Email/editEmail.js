import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { editSpecificTemplate, getSpecificTemplate } from "../../services/mails";
import { Editor } from '@tinymce/tinymce-react';

function EditEmail() {
    var config = {
        selector: "#editor",
        height: 1000,
        autosave_ask_before_unload: false,
        powerpaste_allow_local_images: true,
        plugins: [
            '  advlist anchor autolink codesample fullscreen help image imagetools tinydrive',
            ' lists link media noneditable  preview quickbars ',
            ' searchreplace table template visualblocks wordcount print hr'
        ],
        toolbar: "undo redo print | styleselect hr | fontselect fontsizeselect bold italics underline | forecolor backcolor | link image | alignleft aligncenter alignright alignjustify |lineheight | numlist bullist indent outdent | removeformat",
        content_css: "document",
        skin: "material-classic",
        icons: "material",
        spellchecker_dialog: true,
        spellchecker_whitelist: ['Ephox', 'Moxiecode'],
        tinydrive_demo_files_url: '/docs/demo/tiny-drive-demo/demo_files.json',
        tinydrive_token_provider: function (success, failure) {
            success({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo' });
        },
        content_style: "@import url('@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');'); body { font-family: 'Libre Baskerville', Georgia, serif; font-size: 16pt; color: #292929; }",
        quickbars_selection_toolbar: "bold italic underline link | forecolor backcolor | alignleft aligncenter | fontsizeselect",
        quickbars_insert_toolbar: "image media styleselect hr",
        relative_urls: false,
        remove_script_host: false,
        document_base_url: 'https://curlyhairedescapade.herokuapp.com/',
        force_br_newlines: true,
        inline_styles: true,
        branding: false,
        style_formats: [
            {
                title: 'Button', inline: 'span', styles: {
                    'background-color': 'rgb(182, 84, 122)', 'border': 'none',
                    'border-radius': '4px', 'box-sizing': 'border-box',
                    'color': '#ffffff',
                    'display': 'inline-block', 'outline': 'none',
                    'padding': '6px 20px',
                    'text-decoration': 'none'
                }
            },
            {
                title: 'Line', selector: 'hr', styles: {
                    'width': '80%',
                    'border-top': '1.5px solid lightgrey'
                }
            },
            {
                title: 'No underline', selector: 'a', styles: {
                    'text-decoration': 'none',
                    'box-shadow': 'none'
                }
            },
            {
                title: 'Div', inline: 'span',
                styles: {
                    'background-color': 'rgb(182, 84, 122)',
                    'border': 'none',
                    'box-sizing': 'border-box',
                    'display': 'block',
                    'padding': '40px',
                    'margin': '0',
                    'line-spacing': '2px'
                }
            }

        ]
    };

    let { templateId } = useParams();
    const [emailInfo, setEmailInfo] = useState({
        subject: "",
        name: ""
    });
    const [html, setHtml] = useState("");
    let flag = false;
    const [alert, setAlert] = useState(false);
    const mounted = useRef(true);

    useEffect(() => {
        document.title = "Edit Email Template | Curly Haired Escapade"
    }, [])

    useEffect(() => {
        getSpecificTemplate(templateId)
            .then(items => {
                setEmailInfo({
                    name: items.name,
                    subject: items.subject
                })
                setHtml(items.html)
            })
    }, [flag, templateId]);

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                if (mounted.current) {
                    setAlert(false);
                }
            }, 1000)
        }
    }, [alert]);

    function handleOtherChange(content) {
        setHtml(content);
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setEmailInfo((prevValues) => {
            return { ...prevValues, [name]: value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        editSpecificTemplate(templateId, emailInfo, html)
            .then(() => {
                if (mounted.current) {
                    setAlert(true);
                }
            })
    }

    return (
        <div className="centered">
            <h1 className="text-center">Edit Email Template</h1>
            <form className="email-form">
                {flag = true}
                <div className="form-group ">
                    <label htmlFor="name">Edit name of template</label>
                    <input type="text" className="form-control" name="name" placeholder="Name" value={emailInfo.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Edit subject of template</label>
                    <input type="text" className="form-control" name="subject" placeholder="Subject" value={emailInfo.subject} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="editor">Enter body of email</label>
                    <Editor apiKey={`${process.env.REACT_APP_TINY_API_KEY}`} id="editor" init={config} onEditorChange={handleOtherChange} value={html} />
                </div>
                <div className="form-group">
                    {alert && <h2> Submit Successful</h2>}
                    <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default EditEmail;