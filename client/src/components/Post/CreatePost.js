import React, {useState} from 'react';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import moment from 'moment';
import {useHistory} from 'react-router-dom';
import './styles.css';
import { encode } from 'querystring';

const CreatePost = ({onPostCreated}) =>{
    let history = useHistory();

    const [postData, setPostData]=useState({
    title:'',
    body:'',
    image:''
    });

    const [imageData, setImageData] = useState({
        imageName: '',
        imageType:'',
        imageLength:'',
        imageURI:'',
        imageMetaData:''
    });

    const{title, body,image} = postData;
    const{imageName,imageType,imageLength,imageURI,imageMetaData} = imageData;

    const onChange = e => {
        const {name, value} = e.target;

        setPostData({
            ...postData,
            [name]:value
        });

        setImageData({
            ...ImageData,
            [name]:value
        });
    };

    const create = async () =>{
        if(!title || !body ||!image){
            console.log('Title, body & image are required');
        }else
        {
            const newPost = {
                id: uuid.v4(),
                title: title,
                body:body,
                image:image,
                date: moment().toISOString()
            };
            try{
                const config = {
                    headers: {
                        'Content-Type':'application/json',
                        'Content-Transfer-Encoding': 'multipart/form-data'
                    }
                };


                //create the post
                const body = JSON.stringify(newPost);
                const image = Image;
                const res = await axios.post(
                    'http://localhost:5000/api/posts',
                    body,
                    image,
                    config
                );
                
                //call the handler and redirect
                onPostCreated(res.data);
                history.push('/');
            }
            catch(error){
                console.error('Error creating post: $(error.response.data)');
             }
            }
        };

        const create1 = async () =>{
        if(!image){
            console.log('image is required');
        }else
        {
            const newImageData = {
            imageid: uuid.v4(),
            imageName: imageName,
            imageType: imageType,
            imageLength: imageLength,
            imageURI:imageURI,
            imageMetaData:imageMetaData,
            date: moment().toISOString()
            };
            try
            {
                const config1 = {
                    headers: {
                        'Content-Type':'application/json',
                    }
                };

                //create the imagedata
                const imageName = JSON.stringify(newImageData);
                const imageType =JSON.stringify(newImageData);
                const imageLength = JSON.stringify(newImageData);
                const imageURI = encodeURI(JSON.stringify(newImageData));
                const imageMetaData = encode(JSON.stringify(newImageData));
                const res = await axios.post(
                    'http://localhost:5000/api/posts',
                    imageName,imageType,imageLength, imageURI, imageMetaData,
                    config1,
                );

                 //call the handler and redirect
                onPostCreated(res.data);
                history.push('/');
            }
            catch(error){
                console.error('Error creating post: $(error.response.data)');
             }
            }
        };

    return(
        <div className="form-container">
            <h2>Create New Post</h2>
            <input
                name = "title"
                type = "text"
                placeholder = "Title"
                value = {title}
                onChange = {e => onChange(e)}
            />
            <textarea
                name = "body"
                cols = "30"
                rows = "10"
                value = {body}
                onChange = {e => onChange(e)}
            ></textarea>
            <p>
                <image 
                name = "Photo"
                type = ".jpeg"
                value = {image}
                onChange = {e => onChange(e)}>
                </image>
            </p>
            <button onClick = {() => create() + create1()}>Submit</button>
        </div>
    );
};

export default CreatePost;