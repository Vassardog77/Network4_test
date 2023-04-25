import React from 'react'
import { useDispatch } from 'react-redux';
import { postEmail } from '../../actions/emailActions'
import axios from 'axios';
import { Buffer } from 'buffer'
import { base_url } from '../../api';
const current_user = JSON.parse(localStorage.getItem('user'))

function EmailFunctionality(props) {


    const dispatch = useDispatch()      //establishing dispatch function (necessary for some reason)

    let sendEmail = async (e) => {       //sending email to the server (function comming from actions folder)
        e.preventDefault()
        let data = Buffer.from(
            'Subject: '+e.target[1].value+'\n'+   //setting subject
            'To: '+e.target[0].value+'\n\n'+     //setting recipient
            e.target[2].value                   //setting body text
            ).toString('base64')
        let email = {
            "user":current_user.email,
            "raw":data
        }
        dispatch(postEmail(email))
        alert("Email Sent!")
    }

    return (
        <div>
            <form onSubmit={sendEmail}>
            <div><input type='email' placeholder='To:' required></input></div>
            <div><input type='text' placeholder='subject'></input></div>
            <div><textarea placeholder='body'></textarea></div>
            <div><button type='submit'>Send Email</button></div>
          </form>
        </div>
    );
}

export default EmailFunctionality;