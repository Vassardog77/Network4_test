import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    profile_pic: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    comments: Array
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage