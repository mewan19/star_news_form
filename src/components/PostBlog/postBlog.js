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


      //get input field value
      const [title, setTitle] = React.useState('');
      const [slug, setSlug] = React.useState('');
      const [link, setLink] = React.useState('');
      //const [description, setDescription] = React.useState('');
      const [excerpt, setExcerpt] = React.useState('');
      const [featuredImage, setFeaturedImage] = React.useState("");
      const [featured, setFeatured] = React.useState('');
      const [category, setCategory] = React.useState('');
      const [author, setAuthor] = React.useState('');
      const [tags, setTags] = React.useState('');
      
      const submitHandler = e => {
        e.preventDefault();
      
        //  setLoader(true);
      
       
       
       

         fetch('https://newsserverapi.herokuapp.com/post',{
             method:"Post",
             headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
             body:JSON.stringify({
                "title": title,
                "slug": slug,
                "link": link,
                "description": convertedContent,
                "excerpt": excerpt,
                "featuredImage": featuredImage,
                "featured": featured,
                "category": category,
                "author": author,
                "tags": tags
            })
         }).then(response => {
                  console.log(response)
                document.getElementById("blogForm").reset();
                // setLoader(false)
                setSuccess('Your Blog has been successfully posted.');
                setEditorState(EditorState.createEmpty());
              })
        //   axios.post('https://newsserverapi.herokuapp.com/post', {body:'test'}, {
        //       headers: {
        //           'Content-Type':  'application/x-www-form-urlencoded'
        //       }
        //   })
        //   .then(response => {
        //       console.log(response)
        //     document.getElementById("blogForm").reset();
        //     // setLoader(false)
        //     setSuccess('Thank you for your application. We will contact you shortly.')
        //   }).catch(error => {
        //     console.log(error.response)
        // })
       }


    return (
        <div>
            <Header>
                <img src={blogsLogo}  alt="logo"></img>
                <br/> <br/>
            </Header>
       <MainContainer> 
          
       <h1 style={{textAlign:'center'}}>Post a blog</h1>
      
       <form  id="blogForm" method="post" onSubmit={(e)=>submitHandler(e)}>
           <label className="labelClass">Title: <span className="spanClass">*</span></label>
           <input className="inputClass" type="text" name="title" onChange={event => setTitle(event.target.value)} required/>
            <br/>
           <label className="labelClass">Slug:  <span className="spanClass">*</span></label>
           <input className="inputClass" type="text" name="slug" onChange={event => setSlug(event.target.value)} required/>
           <br/>
           <label className="labelClass">Link: </label>
           <input className="inputClass" type="text" name="link" onChange={event => setLink(event.target.value)}/>
           <br/>
           <label>Description: </label>
      
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
           <input className="inputClass" type="text" name="excerpt" onChange={event => setExcerpt(event.target.value)} required/>
           <br/>
           <label className="labelClass">Featured Image: <span className="spanClass">*</span></label>
           <input className="inputClass" type="file" name='featuredImage' accept="image/png, image/jpeg" onChange={event => setFeaturedImage(event.target.files[0])} required></input>
           <br/>
           <label className="labelClass">Featured: <span className="spanClass">*</span></label>
          <select className="inputClass" name="featured" onChange={event => setFeatured(event.target.value)}>
           <option value="">-Select Option-</option>   
           <option value="true">Yes</option>
           <option value="false">No</option>
          </select>
          <br/>
          <label className="labelClass">Category: <span className="spanClass">*</span></label>
          <select className="inputClass" name="category" onChange={event => setCategory(event.target.value)} required>
           <option value="">-Select One-</option>
           <option value="1">Star News</option>
           <option value="2">Star Blogs</option>
          </select>
          <br/>
          <label className="labelClass">Author: <span className="spanClass">*</span></label>
          <select className="inputClass" name="author" onChange={event => setAuthor(event.target.value)} required>
           <option value="">-Select One-</option>
           <option value="1">Aamir Saeed</option>
           <option value="2">Arif Mustafa</option>
          </select>

          <br/>
          <label className="labelClass">Tags: </label>
          <input className="inputClass" type="text" name="tags" onChange={event => setTags(event.target.value)} required></input>
          <div style={{textAlign:'center'}}>
          <button className="inputSubmitClass">Submit</button>
          </div>
          <br/>
        {success}
        <br></br>
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
text-align:center;
`


export default PostBlog;