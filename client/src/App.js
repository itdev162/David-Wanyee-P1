/* jshint esversion: 5 */ 
import React from 'react';
import axios from 'axios';
import {View, Image, Button} from 'babel-preset-react';
import ImagePicker from '@frameworkless/bodyparser';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PostList from './components/PostList/PostList';
import Post from './components/Post/Post';
import CreatePost from './components/Post/CreatePost';
import EditPost from './components/Post/EditPost';
import './App.css';

const uploadImageData = (image, body) =>{
    const data = new FormData();

    data.append("image",{
      name: image.fileName,
      type: image.type,
      uri: image.uri('./components/Images')
      
    })

    Object.keys(body).forEach(key =>{
      data.append(key, body[key]);
    });

    return data;
  };
class App extends React.Component{
  state = {
    posts:[],
    post:null,
    image: null
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response =>{
      if(response.uri){
        this.setState({image:response})
      }
    })
  };

  handleUploadPhoto = () => {
    axios
    .get('./components/Images',uploadImageData)
    .then(response => response.json())
    .then(response => {
      console.log("upload success");
      this.setState({image:null});
    })
    .catch(error =>{
      console.error("upload error");
    });
  };


  deletePhoto = () => {
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

  componentDidMount(){
    axios
    .get('http://localhost:5000/api/values')
    .then((response) => {
      this.setState({
        values:response.data
      });
    })
      .catch((error) => {
          console.error('Error fetching data: $(error)');
      });
    }

  viewPost = (post) => {
    console.log('view' (post.title));
    this.setState({
        post: post
    });
  } 

  deletePost = post =>{
    axios
      .delete('http://localhost:5000/api/post/$(post._id)')
      .then(response =>{
        const newPosts = this.state.posts.filter(p => p.id !==post._id);
         this.setState({
          posts: [...newPosts]
        });
      })
      .catch(error => {
        console.error('Error deleting post: $(error)');
      })
    }


  editPost = post => {
    this.setState({
      post: post
    });
  };

  onPostCreated = post => {
    const newPosts = [...this.state.posts, post];

    this.setState({
      posts:newPosts
    });
  };

  onPostUpdated = post => {
    console.log('updated post:', post);
    const newPosts = [...this.state.posts];
    const index = newPosts.findIndex(p => p.id === post.id);

    newPosts[index] = post;

    this.setState({
      posts:newPosts
    });
  };

  render(){
    const{posts, post, image} = this.state;

    return (
      <Router>
        <div className="App">
          <header className="App-header">PostIt!</header> 
          <nav>
            <link to = "/">Home</link>
            <link to = "/new-post">New Post</link>
          </nav>  
          <main className= "App-content">
            <Switch>
              <Route exact path="/">
                <PostList 
                posts={posts} 
                clickPost={this.viewPost}
                deletePost={this.deletePost}
                EditPost={this.EditPost}
                />
              </Route>
              <Route path= "/posts/:postId">
                <Post post={post}/>
              </Route>
              <Route path = "/new-post">
                <CreatePost onPostCreated={this.onPostCreated} />
              </Route>
              <Route path = "/edit-post/:postId">
                <EditPost post= {post} onPostUpdated={this.onPostUpdated} />
              </Route>
              <Route>
                <View style = {{flex:1, alignItems:'center', justifyContent: 'center'}}>
                  {image && (
                    <React.Fragment>
                      <Image
                        source = {{uri: image.uri}}
                        style = {{width:300, height:300}}
                      />
                      <Button title = "Upload" onClick={this.handleUploadPhoto}/>
                    </React.Fragment>  
                  )}
                  <Button title = "Choose Photo" onClick = {this.handleChoosePhoto}/>
                  <Button title = "Delete Photo" onClick = {this.deletePhoto}/>
                  </View>
              </Route>
            </Switch>
          </main>
        {/* {this.state.values.map((value) => <div key={value}>{value}</div>)}  */}
        </div>
      </Router>
    );
  }
}

export default App;
