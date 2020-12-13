/* jshint esversion: 5 */ 
import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PostList from './components/PostList/PostList';
import Post from './components/Post/Post';
import CreatePost from './components/Post/CreatePost';
import EditPost from './components/Post/EditPost';
import './App.css';


class App extends React.Component{
  state = {
    posts:[],
    post:null,
    image: null
  };

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
    const{posts, post} = this.state;

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
            </Switch>
          </main>
        {/* {this.state.values.map((value) => <div key={value}>{value}</div>)}  */}
        </div>
      </Router>
    );
  }
}

export default App;
