import React, {useState} from 'react';
import axios from 'axios';
import moment from 'moment'
import {useHistory} from 'react-router-dom';
import './styles.css';

const EditPost = ({post, onPostUpdated}) => {
    let history = useHistory();
    const [postData, setPostData] = useState({
        title:post.title,
        body: post.body,
        imagemetadata : post.imagemetadata,
        image: post.image
    });
    const {title, body, imagemetadata ,image } = postData;

    const onChange = e =>{
        const {name, value} = e.target;

        setPostData({
            ...postData,
            [name]:value
        });
    };

    const update = async () =>{
        if(!title || !body || !imagemetadata ||!image){
            console.log('Title, body & image are required');
        }
        else{
            const newPost = {
                id: post.id,
                title:title,
                body:body,
                imagemetadata: imagemetadata,
                image:image,
                date:moment().toISOString()
            };

            try{
                const config = {
                    headers:{
                        'Content-Type': 'application/json',
                        'Content-Transfer-Encoding': 'multipart/form-data'
                    }
                };

                //create the post
                const body = JSON.stringify(newPost);
                const imagemetadata = encodeURI(JSON.stringify(newPost));
                const image = Image.uri('../Images/$(image.fileName)');
                const res = await axios.put(
                    'http://localhost:5000/api/posts',
                    body,
                    imagemetadata,
                    image,
                    config
                );

                //call the handler and redirect
                onPostUpdated(res.data);
                history.push('/');
                }
                catch(error){
                    console.error('Error creating post: $(error.response.data)');
                }
            }
        };  

        return(
            <div className = "form-container">
                <h2>Edit Post</h2>
                <input
                    name = "title"
                    type = "text"
                    placeholder = "Title"
                    value = {title}
                    onChange = {e => onChange(e)}
                />
                <textarea
                    name = "body"
                    cols="30"
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
                <button onClick = {() => update()}>Submit</button>
            </div>
        );
};

export default EditPost;