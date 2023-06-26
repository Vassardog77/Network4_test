import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { base_url } from '../../api';
import EmailFunctionality from './emailFunctionality';
const current_user = JSON.parse(localStorage.getItem('user'))

function Emailvisuals(props) {//email visuals
    const popupRef = useRef();

    const emails = [
        { name: 'Tejaswi', date: '4/11/23', subject: 'Re: AME 220', message:'Thank you for the quick response! I am only available between 10am and noon tomorrow,'},
        { name: 'LinkedIn', date: '4/11/23', subject: 'Gary S. May recently posted', message:'Great chat this morning with VC Pablo Regueren'},
        { name: 'Google', date: '4/11/23', subject: 'Security Alert', message:'Networktest1 was granted access to your Google Account'},
        { name: 'Commence', date: '4/11/23', subject: 'Register to Participate in ', message:'Dear Graduate,Congratulations on the completion of your degree!'},
        { name: 'me', date: '4/11/23', subject: 'popups', message:'One attachment  •  Scanned by Gmail'},
    ]

    useEffect(() => { 
        axios.post(base_url+'/email/list', {
            user: current_user.email
        })
        .then(response => {
            console.log(response.data)})
        }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                var x = document.getElementById("popup3");
                if (x.style.display === "block") {
                    setTimeout(function(){
                        x.style.display = "none";
                    }, 100);
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function display2() {
        var x = document.getElementById("popup3");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }

// Email Front End  
    return (
        <div>
            <div className = 'component_parent'>
                <div className = 'component_header'>Email <FontAwesomeIcon icon={faEnvelope}/></div>
                <div className='create_buttons'><button onClick={display2}>+ Send Email</button></div>
                <div className = 'email_box'>
                    <div className = 'email_box_top'>
                        <div className = 'email_box_top_text'>All</div>
                    </div>
                    <textarea className = 'email_searchBar' placeholder='Search Emails'></textarea>
                    <div className = 'email_info_header'>
                             <FontAwesomeIcon className = 'inbox_icon' icon={faInbox}/>
                            <div className = 'email_info_header_text'>
                                   <div className = "email_box_parent-item Email-grid-item-1">Name</div>  
                                   <div className = "email_box_parent-item Email-grid-item-2">Subject</div>  
                                   <div className = "email_box_parent-item Email-grid-item-3">Message</div>  
                                   <div className = "email_box_parent-item Email-grid-item-4">Date</div>  
                            </div> 
                    </div>
                    <div className = 'email_receive_box'>
                        <div className = "email_receive_parent">  
                                   <div className = "email_receive_parent-item Receive-grid-item-1">{emails[0].name}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-2">{emails[0].subject}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-3">{emails[0].message}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-4">{emails[0].date}</div> 
                        </div>
                        <div className = "email_receive_parent">
                                   <div className = "email_receive_parent-item Receive-grid-item-1">{emails[1].name}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-2">{emails[1].subject}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-3">{emails[1].message}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-4">{emails[1].date}</div> 
                        </div>
                        <div className = "email_receive_parent">
                                   <div className = "email_receive_parent-item Receive-grid-item-1">{emails[2].name}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-2">{emails[2].subject}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-3">{emails[2].message}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-4">{emails[2].date}</div> 
                        </div>
                        <div className = "email_receive_parent">
                                   <div className = "email_receive_parent-item Receive-grid-item-1">{emails[3].name}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-2">{emails[3].subject}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-3">{emails[3].message}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-4">{emails[3].date}</div> 
                        </div>
                        <div className = "email_receive_parent">
                                   <div className = "email_receive_parent-item Receive-grid-item-1">{emails[4].name}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-2">{emails[4].subject}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-3">{emails[4].message}</div>  
                                   <div className = "email_receive_parent-item Receive-grid-item-4">{emails[4].date}</div> 
                        </div>
                    </div>
                </div>
            </div>
            <div id='popup3' ref={popupRef}><EmailFunctionality></EmailFunctionality></div>            
        </div>
    );
}

export default Emailvisuals;