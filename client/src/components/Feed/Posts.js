import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from '../../actions/posts' 
import { createComment } from '../../actions/commentActions' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { sendNotification } from '../../actions/notificationActions' 
const current_user = JSON.parse(localStorage.getItem('user'))

function Post({post, current_user, dispatch}) { 
    const [comment, setComment] = useState(''); 
    const [postComments, setPostComments] = useState(post.comments || []);

    const handleSubmitComment = (event) => {
        event.preventDefault();
        const newComment = {id: post._id, user: current_user.email, comment: comment};
        dispatch(createComment(newComment));
        //creating new notification
        console.log("sending notification")
        dispatch(sendNotification({
            type : "comment",
            recipient : [post.creator],
            sender : current_user.email,
            content : {message: comment}
          }))
        setPostComments([...postComments, newComment]);
        setComment('');
        console.log(newComment);
    };

    return (
        <div className='feed_item' key={post._id}>
            <div className='feed_title'>
                <img src={post.profile_pic} alt=""></img>
                <div>{post.creator}</div>
            </div>
            <div className='post'>
                <img src={post.selectedFile} alt=""></img>
                <div className='post_caption'>
                    {post.message}
                    {post.creator === current_user.email && 
                    <FontAwesomeIcon className='trash_icon' onClick={() => dispatch(deletePost(post._id))} icon={faTrash}/>}
                </div>
                <div>
                    <input
                        type="text" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Add a comment..." >
                    </input> 
                    <button onClick={(event) => handleSubmitComment(event)}>Submit</button>
                </div>
                <div>
                    {postComments.slice().reverse().map((cmt) => (
                        <div key={cmt._id}>
                            <div><b>{cmt.user}</b>: {cmt.comment}</div>
                        </div>
                    ))}
                </div>
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
