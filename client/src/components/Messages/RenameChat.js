import React, { useState } from 'react';
import { renameChat } from '../../actions/chatActions';
import { useDispatch } from 'react-redux'

function RenameChat({ room }) {
  const dispatch = useDispatch();
  const [newChatName, setNewChatName] = useState(''); // New state variable for the text area value

  let rename_chat = () => {
    if (room && room !== "undefined") { // Checking if room is not undefined or "undefined"
      if (newChatName.trim() !== "") { // Checking if the text area is not empty
        console.log("dispatching")
        dispatch(renameChat({
          room: room,
          newChatName: newChatName
        }));
      } else {
        //alert("Chat name cannot be blank!");
      }
    } else {
      //alert("Room is undefined!");
    }
  }

  return (
    <span>
      <textarea 
        value={newChatName}
        onChange={(e) => setNewChatName(e.target.value)}
      />
      <button onClick={rename_chat}>Rename Chat</button>
    </span>
  );
}

export default RenameChat;
