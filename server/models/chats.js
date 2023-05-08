import mongoose from "mongoose"

const chatSchema = mongoose.Schema({
    room: String,
    messages: Array,
})
const Chat = mongoose.model('Chat', chatSchema)
export default Chat