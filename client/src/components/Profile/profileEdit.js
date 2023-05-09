import React, { useState } from 'react';
import FileBase from 'react-file-base64'
import { postProfile } from '../../actions/profileActions'
import { useDispatch } from 'react-redux';
function ProfileEdit(props) {

    const [Img1, setImg1] = useState('')
    const [Img2, setImg2] = useState('')
    const [Img3, setImg3] = useState('')
    const [Img4, setImg4] = useState('')
    
    const dispatch = useDispatch()      //establishing dispatch function (necessary for some reason)
    const current_user = JSON.parse(localStorage.getItem('user'))

    let post_profile = async (e) => {
        e.preventDefault()
        let profile = ({
            "user":current_user.email,
            "img1":Img1,
            "org_name":e.target[1].value,
            "img2":Img2,
            "contact":e.target[3].value,
            "img3":Img3,
            "description":e.target[5].value,
            "img4":Img4
        })
        alert("Profile Updated!")
        dispatch(postProfile(profile))
    }

    return (
        <div className='profile_edit'>
            <form onSubmit={post_profile}>
                <div>Add image(s):<FileBase type='file' multiple={false} onDone={({base64}) =>setImg1(base64)}></FileBase></div>
                <div><textarea placeholder='Organization Name'></textarea></div>
                <div>Add image(s):<FileBase type='file' multiple={false} onDone={({base64}) =>setImg2(base64)}></FileBase></div>
                <div>Where to Contact Us</div>
                <div><textarea placeholder='Contact information'></textarea></div>
                <div>Add image(s):<FileBase type='file' multiple={false} onDone={({base64}) =>setImg3(base64)}></FileBase></div>
                <div><textarea placeholder='Description'></textarea></div>
                <div>Add image(s):<FileBase type='file' multiple={false} onDone={({base64}) =>setImg4(base64)}></FileBase></div>
                <div><button type='submit'>Save Profile</button></div>
            </form>
        </div>
    );
}

export default ProfileEdit;