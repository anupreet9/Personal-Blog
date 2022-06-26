import React, { useEffect, useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { setItem } from '../../services/posts'

function Add() {
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
    document_base_url: 'http://curlyhairedescapade.com/',
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
        title: 'Div', selector: 'p,h1,h2,h3,h4,h5,h6,div',
        styles: {
          'background-color': '#bcbcbc',
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
  const [edit, setEdit] = useState(false)
  const [postInput, setPostInput] = useState({
    title: '',
    displayImage: '',
    edit: edit,
    description: ''
  });
  const [post, setPost] = useState("");
  const [alert, setAlert] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    document.title = "Add Blog Post | Curly Haired Escapade"
  }, [])

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
      }, 1000)
    }
  }, [alert]);

  function handleChange(content) {
    setPost(content);
  }

  function handleOtherChange(event) {
    const { value, name } = event.target;
    setPostInput((prevValues) => {
      return { ...prevValues, [name]: value }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setItem(postInput, post)
      .then(() => {
        if (mounted.current) {
          setPost("");
          setPostInput({
            title: '',
            displayImage: '',
            edit: false,
            description: ''
          });

          setAlert(true);
          window.location.replace("/admin/dashboard/search")
        }
      })
  }

  function onChecked(event) {
    const { name } = event.target;
    setEdit(!edit);
    setPostInput((prevValues) => {
      return { ...prevValues, [name]: !edit }
    });
  }

  return (
    <div className="centered">
      <h1 className="text-center">Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Enter title of post</label>
          <input type="text" className="form-control" name="title" onChange={handleOtherChange} value={postInput.title} id="title" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Enter description of post</label>
          <textarea name="description" className="form-control" id="description" rows="3" onChange={handleOtherChange} value={postInput.description} ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="editor">Enter content of post</label>
          <Editor apiKey={`${process.env.REACT_APP_TINY_API_KEY}`} id="editor" init={config} onEditorChange={handleChange} value={post} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Enter URL of display image of Blog</label>
          <input type="url" className="form-control-file" id="displayImage" name="displayImage" value={postInput.displayImage} onChange={handleOtherChange} />
        </div>
        <div className="form-group">
          <input type="checkbox" id="checkbox" name="edit" onClick={onChecked} aria-label="Checkbox for following text input" checked={edit}></input>
          <label htmlFor="checkbox">Check if post draft is final</label>
        </div>
        <div className="form-group">
          {alert && <h2> Submit Successful</h2>}
          <input type="submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default Add;



