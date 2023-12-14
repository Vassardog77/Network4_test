import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../../api';
import { useParams, Link } from 'react-router-dom';

function ProfileView(props) {
    const current_user = JSON.parse(localStorage.getItem('user'))
    const { id } = useParams();

    const [Img1, setImg1] = useState('');
    const [noProfile, setNoProfile] = useState(false);

    const fetchData = async () => { 
        console.log("getting the profile");
        const email = id ? id : current_user.email;

        await axios.post(base_url+'/profiles/get',
        {
            data: email
        })
        .then((response) => {
            console.log(response.data);
            if (response.data && response.data.img1) {
                setImg1(response.data.img1);
                setNoProfile(false);
            } else {
                setNoProfile(true);
            }
        });
    };

    useEffect(()  => {
        fetchData();
    }, []);

    const messageLink = () => {
        const room = [current_user.email, id].sort().join(', ');
        return `/messages/${room}`;
    };

    const messageClass = noProfile ? 'message_link_no_profile' : 'message_link_with_profile';

    return (
        <div className="profile">
            {id && (
                <div className={messageClass}>
                    <Link to={messageLink()}><button>Message</button></Link>
                </div>
            )}
            {noProfile ? (
                <div className='no_profile_message'>No profile yet</div>
            ) : (
                <div className='profile_maincontent'>
                    {Img1 && <img src={Img1} alt="" className="profile_full_image" />}
                </div>
            )}
        </div>
    );
}

export default ProfileView;
