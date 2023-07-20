import axios from 'axios'
import Chat from '../models/chats.js'

export const saveMessage = async (message) => {
    //console.log(message)
    const message_history = await Chat.findOne({room: message.room})
    if (message_history) {
        //console.log('there are previous messages')

        message_history.messages.push(message) //adding new message to array
        await Chat.deleteMany({room: message.room}) //deleting old chat history to replace it with new one
        const newChat = new Chat()            //setting the value for mongodb

        newChat.room = message.room
        newChat.messages = message_history.messages

        await newChat.save()                          //saving the value to mongodb  

        //console.log(message_history.messages)
    } else {
        //console.log('no previous messages')

        const newChat = new Chat()            //setting the value for mongodb
        newChat.room = message.room
        newChat.messages = [message]
        await newChat.save()                          //saving the value to mongodb  
        
    }
}


export const getMessages = async (req, res) => {

    if(req.body.room) { //if client is asking for a specific room, provide message history
        try {
            const room = req.body.room
            const message_history = await Chat.findOne({room: room}) //getting message history from the database
            if(message_history){
                res.status(200).json(message_history.messages)
            } else {
                res.status(200).json(null)
            }
        } catch (error) {
            res.status(500).json({ error })
        }
    } else if (req.body.user) { //if client is asking for a user, send all rooms user is involved in
        try {
            const user = req.body.user

            const message_history = await Chat.find({ room: { "$regex": user } }); //getting all message histories containing user from the database

            let rooms = []

            message_history.forEach(element => {
                rooms.push({
                    room: element.room,
                    room_name: element.room_name // This could be undefined if no room_name has been set
                })
            });
            
            res.status(200).json(rooms)

        } catch (error) {
            res.status(500).json({ error })
        }
    }
}


export const addPeople = async (req, res) => {
    const { room, selectedUsers } = req.body;
    
    try {
        // Find the chat with the provided room
        const chat = await Chat.findOne({ room: room });

        if (!chat) {
            return res.status(404).send('Chat not found');
        }
        
        // Split the current room into an array
        let roomArray = chat.room.split(',').map(email => email.trim());
        
        // Add new users to the room
        roomArray = roomArray.concat(selectedUsers);
        
        // Remove duplicates and sort
        roomArray = [...new Set(roomArray)].sort();
        
        // Convert back to comma separated string
        chat.room = roomArray.join(', ');
        console.log(chat.room)

        // Save the chat
        await chat.save();
        
        res.status(200).json({ message: 'People added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
}

export const renameChat = async (req, res) => {
    const { room, newChatName } = req.body;
    
    try {
      // Find the chat room
      const chat = await Chat.findOne({ room: room });
  
      if (!chat) {
        return res.status(404).json({ message: "Chat room not found" });
      }
  
      // If room_name is not defined, initialize it
      if (!chat.room_name) {
        chat.room_name = newChatName;
      }
  
      // Update the room name
      chat.room_name = newChatName;
  
      // Save the chat room
      const updatedChat = await chat.save();
  
      // Send back the updated chat
      res.json(updatedChat);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  export default renameChat;