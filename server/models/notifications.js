import mongoose from "mongoose"

const notificationSchema = mongoose.Schema({
    user: String,
    unreads:Array,
})
const Notification = mongoose.model('Notification', notificationSchema)
export default Notification