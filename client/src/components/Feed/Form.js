import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts'
import axios from 'axios';
import InstagramLogin from "../MediaLogin/InstagramLogin"
import FacebookLogin from "../MediaLogin/FacebookLogin"
import { base_url } from '../../api';

function Form(props) {
    const [instagram_login, setInstagramLogin] = useState(localStorage.getItem('instagram_login'));
    const current_user = JSON.parse(localStorage.getItem('user'))

    const [postData, setPostData] = useState({ creator: current_user.email, message: '', tags: '', selectedFile: '' });
    const [MediaSelector, setMediaSelector] = useState("Network")
    const [CreationId, setCreationId] = useState("")

    const change_mediaselector_instagram = () => {  
        setMediaSelector("Instagram")
    }

    const change_mediaselector_network = () => {
        setMediaSelector("Network")
    }

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(MediaSelector === "Network") { //if its set to network, post to network
            dispatch(createPost(postData))
            alert("Post Created!")
            setPostData({ creator: current_user.email, message: '', tags: '', selectedFile: '' });
        } else if (MediaSelector === "Instagram") { //if its set to instagram, post to instagram
            console.log(postData)
            axios.post(base_url+"/post/ig1", postData)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCreationId(response.data.id)
                alert("Post Created!")
                setPostData({ creator: current_user.email, message: '', tags: '', selectedFile: '' });
              })
              .catch((error) => {
                alert("Error Creating Post. \nPlease make sure that you are logged in and try again")
                console.log(error);
              });
        }
    }

    useEffect(() => {
        if(CreationId === "") {
            return
        }
        axios.post(base_url+"/post/ig2", {
            "creation_id":CreationId,
            "user": current_user.email
        })
    }, [CreationId])

    const clear = () => {
        setPostData({ creator: current_user.email, message: '', tags: '', selectedFile: '' });
    }

    useEffect(() => {
        if ((instagram_login === 'false' || instagram_login === null) && MediaSelector === "Instagram") {
            console.log("not logged in with instagram")
        }
    }, [instagram_login,MediaSelector])

    return (
        <div>
            <div className='media_selector_button'>
                <button onClick={change_mediaselector_network}>Network</button>
                <button onClick={change_mediaselector_instagram}>Instagram</button>
                <div>Posting to: {MediaSelector}</div>
            </div>
            {(instagram_login === 'false' || instagram_login === null) && MediaSelector === "Instagram" ? (
                <div className='login_message'>
                    <div>Please log in with Instagram to continue</div>
                    <div className='Loginbar'>
                        <div><FacebookLogin></FacebookLogin></div>
                        <div><InstagramLogin></InstagramLogin></div>
                    </div>
                </div>
            ) : (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <FileBase type='file' multiple={false} onDone={({base64}) =>setPostData({ ...postData, selectedFile: base64})}></FileBase>
                        </div>
                        <textarea  placeholder='Message' value={postData.message}onChange={(e) => setPostData({ ...postData, message: e.target.value })}></textarea>
                        <textarea  placeholder='Tags' value={postData.tags}onChange={(e) => setPostData({ ...postData, tags: e.target.value })}></textarea>
                        <button>Submit</button>
                        <button type="button" onClick={clear}>Clear</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Form;
