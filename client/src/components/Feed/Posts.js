import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from '../../actions/posts' 
import { createComment } from '../../actions/commentActions' 
import { likePost } from '../../actions/likeActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faHeart } from '@fortawesome/free-solid-svg-icons' // import thumbs up icon for like button
import { sendNotification } from '../../actions/notificationActions' 

function Post({post, current_user, dispatch}) { 
    const [comment, setComment] = useState(''); 
    const [postComments, setPostComments] = useState(post.comments || []);
    const [likeState, setLikeState] = useState(false); // like state for the current post
    const [likeCount, setLikeCount] = useState(post.likes.likeCount || 0); // like count for the current post

    useEffect(() => {
        // Check if the current user has liked the post already
        if (post.likes && post.likes.likeArray.includes(current_user.email)) {
            setLikeState(true);
        } else {
            setLikeState(false);
        }
        setLikeCount(post.likes.likeCount || 0); // update the likeCount state whenever the post changes
    }, [post, current_user]);

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

     // Function to handle liking and unliking posts
     const handleLike = () => {
        // Toggle like state
        setLikeState(!likeState);
        // Update the like count based on whether the user is liking or unliking the post
        setLikeCount(likeState ? likeCount - 1 : likeCount + 1);
            
        // The 'newLike' object to be sent to the server
        const newLike = {
            id: post._id, 
            user: current_user.email, 
            adding: !likeState
        }; 
    
        console.log("dispatching a "+ !likeState+" like");
    
        // Dispatch the action to send the new like or unlike to the server
        dispatch(likePost(newLike)).then(() => {
        });
    };

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
                <div className='like_bar'>
                    {/* Like button */}
                    <button onClick={handleLike} style={likeState ? {color: 'red'} : {color: 'grey'}}> 
                        <FontAwesomeIcon icon={faHeart} className="likeIcon"/>
                        <span className="likeCount">{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
                    </button>
                </div>
                <div className='comment_bar'>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                    /> 
                    <button onClick={(event) => handleSubmitComment(event)}>Submit</button>
                </div>
                <div>
                    {postComments.slice().reverse().map((cmt) => (
                        <div key={cmt._id}>
                            <div><b>{cmt.user.split('@')[0]}</b>: {cmt.comment}</div>
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
