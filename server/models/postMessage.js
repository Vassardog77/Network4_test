import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    profile_pic: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    comments: Array,
    likes: {
        type: {
            likeCount: Number,
            likeArray: Array
        },
        default: {likeCount: 0, likeArray: []} // set the default value
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage