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
}

