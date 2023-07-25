import mongoose from "mongoose"

const chatbotKeySchema = mongoose.Schema({
    key: String,
})
const ChatbotKey = mongoose.model('ChatbotKey', chatbotKeySchema)
export default ChatbotKey