import React from "react";
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import blogsLogo from '../../assets/star-blogs.png';
import axios from "axios";

function PostBlog(){

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
      );
    
      
      const  [convertedContent, setConvertedContent] = React.useState(null);
      const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }
      const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
      }


      //Submit Form
      const [success,setSuccess] = React.useState('');
      const submitHandler = e => {
        e.preventDefault();
      
        //  setLoader(true);
          const data = new FormData(e.target);
          axios.post('#', data, {
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then(response => {
              console.log(response)
            document.getElementById("blogForm").reset();
            // setLoader(false)
            setSuccess('Thank you for your application. We will contact you shortly.')
          })
       }


    return (
        <div>
            <Header>
                <img src={blogsLogo} alt="logo"></img>
                <br/> <br/>
            </Header>
       <MainContainer> 
          
    
       <h1 style={{textAlign:'center'}}>Post a blog</h1>
      
       <form encType="multipart/form-data" id="blogForm" method="POST" onSubmit={(e)=>submitHandler(e)}>
           <label className="labelClass">Title: <span className="spanClass">*</span></label>
           <input className="inputClass" type="text" name="title" required/>
            <br/>
           <label className="labelClass">Slug:  <span className="spanClass">*</span></label>
           <input className="inputClass" type="text" name="slug" required/>
           <br/>
           <label className="labelClass">Link: </label>
           <input className="inputClass" type="text" name="link"/>
           <br/>
           <label>Description: </label>
           <input type="hidden" value={convertedContent} name="description"/>
           <EditorStyles>
      <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      wrapperClassName="wrapper-class"
  editorClassName="editor-class"
  toolbarClassName="toolbar-class"
  
   />
     </EditorStyles>
           <br/>
           <label className="labelClass">Excerpt: <span className="spanClass">*</span></label>
           <input className="inputClass" type="text" name="link" required/>
           <br/>
           <label className="labelClass">Featured Image: <span className="spanClass">*</span></label>
           <input className="inputClass" type="file" name="featured_image" accept="image/*" required></input>
           <br/>
           <label className="labelClass">Featured: <span className="spanClass">*</span></label>
          <select className="inputClass" name="featured">
           <option value="Yes">Yes</option>
           <option value="No">No</option>
          </select>
          <br/>
          <label className="labelClass">Category: <span className="spanClass">*</span></label>
          <select className="inputClass" name="category" required>
           <option value="">-Select One-</option>
           <option value="1">Star News</option>
           <option value="2">Star Blogs</option>
          </select>
          <br/>
          <label className="labelClass">Author: <span className="spanClass">*</span></label>
          <select className="inputClass" name="author" required>
           <option value="">-Select One-</option>
           <option value="1">Aamir Saeed</option>
           <option value="2">Arif Mustafa</option>
          </select>

          <br/>
          <label className="labelClass">Tags: </label>
          <input className="inputClass" type="text" name="tags" required></input>
          <div style={{textAlign:'center'}}>
          <button className="inputSubmitClass">Submit</button>
          </div>
          <br/>
        {success}
       </form>
       </MainContainer>
       </div>
    )
}


const MainContainer = styled.div`

border-radius: 5px;
background-color: #ffff;
padding-left:50px;
padding-right:50px;
padding-top:20px;
font-family: 'Poppins',sans-serif;

.labelClass{
    color:#333;
    
}

.spanClass{
    color:red;
  fontSize:16px;
}

.inputClass{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.inputSubmitClass{
    width: 30%;
  background-color: #ff000a;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

`

const EditorStyles=styled.div`
.wrapper-class {
margin-top:10px;    
padding: 1rem;
border: 1px solid #ccc;
width:98%;

}
.editor-class {
color: #333;
padding: 1rem;
border: 1px solid #ccc;
height: 300px;


}
.toolbar-class {
border: 1px solid #ccc;
color: #333;
}
`

const Header=styled.div`

`


export default PostBlog;