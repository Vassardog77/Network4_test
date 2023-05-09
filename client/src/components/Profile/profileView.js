import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../../api';
const current_user = JSON.parse(localStorage.getItem('user'))

function ProfileView(props) {

    const [Img1, setImg1] = useState('')
    const [Orgname, setOrgname] = useState('')
    const [Img2, setImg2] = useState('')
    const [Contact, setContact] = useState('')
    const [Img3, setImg3] = useState('')
    const [Description, setDescription,] = useState('')
    const [Img4, setImg4] = useState('')

    const fetchData = async () => { 
        console.log("getting the profile")
         await axios.post(base_url+'/profiles/get',
        {
            data: current_user.email
        })
        .then((response) => {
            console.log(response.data)
            setImg1(response.data.img1)
            setOrgname(response.data.org_name)
            setImg2(response.data.img2)
            setContact(response.data.contact)
            setImg3(response.data.img3)
            setDescription(response.data.description)
            setImg4(response.data.img4)
        })
    }

    useEffect (()  => {
        fetchData()
    }, [])

    return (
        <div className="profile">
            <div className='profile_logo'><img src={Img1} alt=""></img></div>
            <div className='profile_orgname'>{Orgname}</div>
            <div className='profile_maincontent'>
                <div className='profile_contact'>{Contact}<img src={Img2} alt=""></img></div>
                <div className='profile_description'><img src={Img3} alt=""></img>{Description}</div>
            </div>
            <div className='profile_bottom_img'><img src={Img4} alt=""></img></div>
        </div>
    );
}

export default ProfileView;