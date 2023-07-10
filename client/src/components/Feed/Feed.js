import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { getPosts } from '../../actions/posts'
import Posts from './Posts'
import Form from './Form';

const current_user = JSON.parse(localStorage.getItem('user'))

function Feed() {
    const dispatch = useDispatch()
    const popupRef = useRef();

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                var x = document.getElementById("popup4");
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
        var x = document.getElementById("popup4");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    return (
        <div>
            <div className='component_parent'>
                <div className = 'component_header'>Feed <FontAwesomeIcon icon={faListUl}/></div>
                <div className='create_buttons'><button onClick={display2}>+ Create Post</button></div>
                <div id='popup4' ref={popupRef}><Form></Form></div>
                <Posts></Posts>
                <div className='spacer'></div>
            </div>
        </div>
    );
}

export default Feed;
