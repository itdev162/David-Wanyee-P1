import React from 'react';

const Post = props => {
    // eslint-disable-next-line no-unused-vars
    const {post} = props;

        return(
            <div>
                <h1>(post.title)</h1>
                <p>(post.body)</p>
                <image>(post.image)</image>
            </div>    
        )
}

export default Post;