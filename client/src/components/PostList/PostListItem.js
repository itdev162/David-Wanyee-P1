import React from 'react';
import {useHistory} from 'react-router-dom';
import slugify from 'slugify';
import multer from 'multer';
import './styles.css';
import ImagePicker from '@frameworkless/bodyparser';
import {Image} from 'babel-preset-react';
import axios from 'axios';
import metadata from 'reflect-metadata';
//import express from 'express';

const PostListItem = props => 
{
    const {post, clickPost, deletePost, editPost, image} = props;
    const history = useHistory();
    
    const handleClickPost = post =>{
        const slug = slugify(post.title, {lower: true});
        clickPost(post);
        history.push(/posts/(slug));
    };

    const handledEditPost = post =>{
        editPost(post);
        history.push('/edit-post/$(post.id)');
    };

    const handledPickPhoto = post => {
        const options = {
        noData: true,
        }
        ImagePicker.launchImageLibrary(options, response =>{
          if(response.uri){
            this.setState({image:response})
          }
        })
    };

    const imageData = (image, body) =>{
        const data = new FormData();

        data.append("image",{
          name: image.fileName,
          type: image.type,
          length: image.length,
          metadata:image.metadata,
          uri: image.uri('./components/Images')
      
         })

         Object.keys(body).forEach(key =>{
         data.append(key, body[key])
        });
        return data;
    };

    const handledUploadPhoto = () => {
       axios
        .put('./components/Images', imageData)
        metadata(image.fileName, image.key);
        history.push(/posts/(metadata))
        .then(response => response.json())
        .then(response => {
        console.log("upload success");
        this.setState({image:null});
        })
        .catch(error =>{
        console.error("upload error");
        });

        const Storage = multer.diskStorage({
            destination(req, file, callback){
                callback(null, '../Images')
            },
            filename(req, file, callback){
                callback(null, '$(file.fieldname)_$(Date.now())')
            }
        })

        const upload = multer({storage:Storage});

        history.push(upload.array('image',3 ));

        
    };

    const handledDeletePhoto = post => {
        axios
        .delete('./components/Images/$(image.fileName)')
        .then(response => response.json())
        .then(response => {
            console.log("deleted!");
            this.setState({image:null});
        })
        .catch(error =>{
          console.error("delete error");
        });
    }


    return(
        <div>
            <div className="postListItem" onClick={() =>handleClickPost(post)}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p><image>{post.image}</image></p>
            </div>
           <div className="postControls" >
                <button onClick = {() => deletePost(post)}>Delete</button>
                <button onClick = {() => handledEditPost(post)}>Edit</button>

                <view style = {{flex:1, alignItems:'center', justifyContent: 'center'}}>
                  {Image && (
                    <React.Fragment>
                      <image
                        source = {{uri: image.uri}}
                        style = {{width:300, height:300}}
                      ></image>
                     <button onClick = {() => handledUploadPhoto(post)}>Upload </button>
                    </React.Fragment>  
                  )};
            
                <button  onClick = {() => handledPickPhoto(post)}>Choose Photo</button>
                <button onClick = {() => handledDeletePhoto(post)}>Delete Photo </button>
                </view>
           </div> 
        </div>
    );
};

export default PostListItem;