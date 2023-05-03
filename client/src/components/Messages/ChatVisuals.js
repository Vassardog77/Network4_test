//import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";
import { base_url } from "../../api";
const socket = io.connect(base_url);
const current_user = JSON.parse(localStorage.getItem('user'))

function MessageTest() {
  const [Room, setRoom] = useState("");
  const [joinContent, setjoinContent] = useState(<div></div>);
  const [showChat, setShowChat] = useState(false);
  const [emailArray, setemailArray] = useState([current_user.email]);
  const [emailList, setemailList] = useState("");

  const add_to_chat = (email) => {
    let previous_email_array = emailArray
    previous_email_array.push(email)
    previous_email_array.sort() //alphebetize array so that chat is always the same reguardless of order clicked
    console.log(previous_email_array)
    setemailArray(previous_email_array)                 //updating emailArray state

    let email_list = previous_email_array.join(", ")
    setemailList(email_list)                      //updating emailList state

    console.log("email list = " +email_list)
  }


  const joinRoom = (email_list) => {
    let room = email_list
    console.log("current chat room is "+room)
    setRoom(room)//necessary because room is used to below to pass to chat component
    socket.emit("join_room", room);
    setShowChat(true);
  }


  useEffect(() => {           
    axios.get(base_url+'/api/user/get')
    .then(response => {
      let user_array = []
        //console.log(response.data)
        response.data.forEach(async user => {
          user_array.push(<div key={user.email}><button onClick={() => add_to_chat(user.email)}>{user.email}</button></div>)
        })
        setjoinContent(<div>
              {user_array}
            </div>)
    })
}, [])


  return (
    <div className="chat_window_parent">
      <div className="join_chat_container">
          {joinContent}
          </div>
      {!showChat ? (
        <div>
          <div>{emailList}</div>
          <div><button onClick={() => joinRoom(emailList)}>Create Chat</button></div>
        </div>
      ) : (<>
        
        <Chat socket={socket} username={current_user.email} room={Room} />
        </>)}
    </div>
  );
}

export default MessageTest;
