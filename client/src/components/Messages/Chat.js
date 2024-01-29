import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { base_url } from "../../api";
import { useDispatch } from 'react-redux';
import { sendNotification } from '../../actions/notificationActions';
import Addpeople from "./Addpeople";
import RenameChat from "./RenameChat";
const current_user = JSON.parse(localStorage.getItem('user'));

function Chat({ socket, username, room }) {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const fileInputRef = useRef(null);
  const chatWindowRef = useRef(null);

  let roomEmails = room.split(",").map(email => email.trim());
  let recipient = roomEmails.filter(email => email !== current_user.email);

  const sendTextMessage = async (message) => {
    const messageData = {
      room: room,
      author: username,
      message: message,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    };

    await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    dispatch(sendNotification({
      type: "message",
      room: room,
      recipient: recipient,
      sender: current_user.email,
      content: messageData
    }));
  };

  const downscaleImage = (dataURL, callback) => {
    const img = new Image();
    img.onload = () => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let quality = 0.9;
      let newDataURL = canvas.toDataURL('image/jpeg', quality);

      // Continuously decrease quality until size is under 200KB
      while (newDataURL.length > 200 * 1024 && quality > 0.1) {
        quality -= 0.1;
        newDataURL = canvas.toDataURL('image/jpeg', quality);
      }

      callback(newDataURL);
    };
    img.src = dataURL;
  };

  const sendMessage = async () => {
    if (currentMessage) {
      await sendTextMessage(currentMessage);
      setCurrentMessage("");
    }

    if (fileInputRef.current.files.length) {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        downscaleImage(reader.result, async (newDataURL) => {
          await sendTextMessage(newDataURL); // Send the downscaled image as a message
        });
      };
      reader.readAsDataURL(file);
    }

    fileInputRef.current.value = ''; // Reset file input
    setTimeout(() => {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }, 100);
  };

  useEffect(() => {
    axios.post(base_url + '/chats', { room })
      .then(response => {
        if (response.data) {
          setMessageHistory(response.data);
        }
      });

    setTimeout(() => {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }, 100);
  }, [room]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      setTimeout(() => {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
      }, 100);
    });
  }, [socket]);

  return (
    !room || room === "undefined" ? <div /> :
    <>
      <div className="addpeople_button">
        <Addpeople room={room} />
        <RenameChat room={room} />
      </div>
      <div className="chat_window" ref={chatWindowRef}>
        <div className="chat_body">
          <div className="message_container">
            {[...messageHistory, ...messageList].map((messageContent, index) => {
              const isImage = messageContent.message.startsWith('data:image/');
              return (
                <div key={index}>
                  <div className={username === messageContent.author ? "message_you" : "message_other"}>
                    <div>
                      {isImage ? (
                        <img src={messageContent.message} alt="Sent" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                      ) : (
                        <p>{messageContent.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="message_author">{messageContent.author.split('@')[0]}</div>
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
          placeholder="Message..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={sendMessage}
        />
        <button onClick={() => fileInputRef.current.click()}>Upload Image</button>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </>
  );
}

export default Chat;
