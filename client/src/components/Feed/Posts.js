import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from '../../actions/posts' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons' // import thumbs up icon for like button
import LikeComponent from './LikeComponent';
import CommentComponent from './CommentComponent';

function Post({post, current_user, dispatch}) {
    return (
        <div className='feed_item' key={post._id}>
            <div className='feed_title'>
                <img src={post.profile_pic} alt=""></img>
                <div>{post.creator.split('@')[0]}</div>
            </div>
            <div className='post'>
                <img src={post.selectedFile} alt=""></img>
                <div className='post_caption'>
                    {post.message}
                    {post.creator === current_user.email && 
                    <FontAwesomeIcon className='trash_icon' onClick={() => dispatch(deletePost(post._id))} icon={faTrash}/>}
                </div>
                <LikeComponent post={post} current_user={current_user} dispatch={dispatch} />
                <CommentComponent post={post} current_user={current_user} dispatch={dispatch} />
            </div>
        </div>
    )
}



function Posts(props) {
    const dispatch = useDispatch();
    const current_user = JSON.parse(localStorage.getItem('user'));
    const posts = useSelector((state) => state.posts);

    

    if (!posts || !Array.isArray(posts)) {
        return <div>Loading posts...</div>;
    }

    return (
        <div className='feed'>
            {posts.slice().reverse().map((post, index) => 
                <Post key={index} post={post} current_user={current_user} dispatch={dispatch} />
            )}
        </div>
    );
}

export default Posts;
