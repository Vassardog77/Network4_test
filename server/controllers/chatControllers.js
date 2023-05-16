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
            //console.log(req.body.room)
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
            //console.log("user = "+req.body.user)
            const user = req.body.user

            const message_history = await Chat.find({ room: { "$regex": user } }); //getting all message histories containing user from the database

            let rooms = []

            message_history.forEach(element => {
                rooms.push(element.room)
            });
            //console.log(rooms)
            
            res.status(200).json(rooms)

        } catch (error) {
            res.status(500).json({ error })
        }
    }
}

