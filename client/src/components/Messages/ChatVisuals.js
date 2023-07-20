import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";
import { useDispatch, useSelector } from 'react-redux';
import { base_url } from "../../api";
import { deleteNotification } from '../../actions/notificationActions' 
import { useParams, useLocation } from 'react-router-dom';
const socket = io.connect(base_url);
const current_user = JSON.parse(localStorage.getItem('user'))

function ChatVisuals() {
  const location = useLocation();
  let { url_room } = useParams();
  url_room = decodeURIComponent(url_room);

  const [Room, setRoom] = useState("");
  const [Roomlist, setRoomlist] = useState([]);
  const [joinContent, setjoinContent] = useState(<div></div>);
  const [showChat, setShowChat] = useState(false);
  const [newChat, setnewChat] = useState(false);
  const [emailArray, setemailArray] = useState([current_user.email]);
  const [emailList, setemailList] = useState("");

  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);

  useEffect(() => {
    // if a room is specified in the URL, join that room
    if (url_room) {
      //console.log(url_room)
      joinRoom(url_room);
    }
  }, [location]);

  const add_to_chat = (email) => {
    setShowChat(false)//getting rid of the current chat
    let previous_email_array = emailArray
    previous_email_array.push(email)
    previous_email_array.sort() //alphebetize array so that chat is always the same reguardless of order clicked
    //console.log(previous_email_array)
    setemailArray(previous_email_array)                 //updating emailArray state

    let email_list = previous_email_array.join(", ")
    setemailList(email_list)                      //updating emailList state

    //console.log("email list = " +email_list)
  }


  const joinRoom = (email_list) => {
    setShowChat(false)
    setemailList("");
    setemailArray([current_user.email]);

    let timeoutId
    timeoutId = setTimeout(() => {
        let room = email_list;
        setRoom(room)
        socket.emit("join_room", room);

        // Check if there is a notification for the current room and delete it.
        let newNotifications = Array.isArray(notifications) ? notifications.filter((notification) => {
          if (notification.type === 'message' && notification.content.room === room) {
              dispatch(deleteNotification({user: current_user.email, unreads: notification})); 
              return false; 
          }
          return true;
        }) : [];

        setShowChat(true);
    }, 1);
  }


  useEffect(() => {           
    axios.get(base_url+'/api/user/get') //getting all users to display 
    .then(response => {
      let user_array = []
        response.data.forEach(async user => {
          user_array.push(<div key={user.email}><button onClick={() => add_to_chat(user.email)}>{user.email.split('@')[0]}</button></div>)
        })
        setjoinContent(<div>
              {user_array}
            </div>)
    })

    axios.post(base_url+'/chats', { //getting all chatrooms the user is currently involved in
      "user": current_user.email
    })
    .then(response => {
      let roomlist_array = []
      response.data.forEach(async roomObj => {
        let room = roomObj.room;
        let roomName = roomObj.room_name;
        let usernames = room.split(',').map(email => email.trim().split('@')[0]);
        let displayText = roomName ? roomName : usernames.join(', ');
        roomlist_array.push(<div key={room}><button onClick={() => joinRoom(room)}>{displayText}</button></div>)
      })
      setRoomlist(<div>{roomlist_array}</div>)
    })
}, [])



  return (
    <div className="chat_window_parent">
      <div className="join_chat_container">
          <div className="previous_chat_parent">
            <div>Previous Chats:</div>
            {Roomlist}
          </div>
          {!newChat ? 
          (<div className="new_chat_creator"><button onClick={() => setnewChat(true)}>Create New Chat?</button></div>) : 
          (<><div className="new_chat_creator">Select Users:</div>{joinContent}</>)}
      </div>
      {!showChat ? (
        <div className="chat_window">
          <div>{emailList}</div>
          {newChat && <div>
            <button onClick={() => joinRoom(emailList)}>Create Chat</button>
          </div>}
        </div>
      ) : (<>
        
        <Chat socket={socket} username={current_user.email} room={Room} />
        </>)}
    </div>
  );
}

export default ChatVisuals;