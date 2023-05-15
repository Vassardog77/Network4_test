import React, {useState,useEffect} from 'react';
import CalendarComponent2 from './calendarComponent2';
import HomeFunctionality from './homeFunctionality'
import LoginList from '../MediaLogin/LoginList';
import Form from '../Feed/Form';

function HomeVisuals(props) {

    function display() {
        var x = document.getElementById("popup");
        if (x.style.display === "block") {
            x.style.display = "none";
          } else {
            x.style.display = "block";
          }
        }
      

      function display2() {
        var x = document.getElementById("popup2");
        if (x.style.display === "block") {
            x.style.display = "none";
          } else {
            x.style.display = "block";
          }
      }

    return (
        <div className='home'>
            <div className='home_post_buttons'>
                <button onClick={display2}>+ Create Post</button>
                <button  onClick={display}>+ Create Event</button>
                <div id='popup'><HomeFunctionality></HomeFunctionality></div>
                <div id='popup2'><Form></Form></div>
            </div>
            <CalendarComponent2></CalendarComponent2>
        </div>
    );
}

export default HomeVisuals;