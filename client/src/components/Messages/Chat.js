import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../api";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  let message_blocker = false //setting message blocker to stop duplicate messages (glitch)


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => { //getting message history
    axios.post(base_url+'/chats', {
      "room": room
    })
        .then(response => {
            //console.log(response.data)
            if (response.data){
              setMessageHistory(response.data)
            } else {
            return
            }
          })
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => { //recieving messages (message blocker made to stop duplicate message glitch)
      //console.log(messageList)
      if (message_blocker === false) {
        setMessageList((list) => [...list, data]);
        message_blocker = true
      } else {
        message_blocker = false
      }
    });
  }, [socket]);

  return (<>
    <div className="chat_window">
      <div className="chat_header">
      </div>
      <div className="chat_body">
        <div className="message_container">{
        //----------------------populate message histroy-----------------------
            messageHistory.map((messageContent) => {
            return ( //add key to below div at some point
              <div
                className={username === messageContent.author ? "message_you" : "message_other"}
              >
                <div>
                  <div className="message_content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })
            //----------------------populate message histroy-----------------------
        }
          {messageList.map((messageContent) => {
            return ( //add key to below div at some point
              <div
                className={username === messageContent.author ? "message_you" : "message_other"}
              >
                <div>
                  <div className="message_content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    <div className="chat_footer">
    <input
      type="text"
      value={currentMessage}
      placeholder="message..."
      onChange={(event) => {
        setCurrentMessage(event.target.value);
      }}
      onKeyPress={(event) => {
        event.key === "Enter" && sendMessage();
      }}
    />
    <button onClick={sendMessage}>&#9658;</button>
  </div>
  </>);
}

export default Chat;
