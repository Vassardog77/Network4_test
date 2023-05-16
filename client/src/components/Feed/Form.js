import React, { useState } from 'react';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts'
function Form(props) {

    const current_user = JSON.parse(localStorage.getItem('user'))

    const [postData, setPostData] = useState({ creator: current_user.email, message: '', tags: '', selectedFile: '' });

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPost(postData))
        alert("Post Created!")
        setPostData({ creator: current_user.email, message: '', tags: '', selectedFile: '' });
    }

    const clear = () => {
        setPostData({ creator: current_user.email, message: '', tags: '', selectedFile: '' });
    }
    return (
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
    );
}

export default Form;