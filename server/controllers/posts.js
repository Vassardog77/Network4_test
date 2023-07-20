import PostMessage from "../models/postMessage.js"
import User from '../models/userModel.js'
import ScheduledPost from '../models/scheduledPost.js';
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPosts = async (req, res) => {
    const post = req.body
    const creator = await post.creator
    const user = await User.findOne({email: creator})

    if (post.date) { // If the post has a date, schedule it
        console.log("scheduling post") //logging that a post is in fact being processed as a scheduled post
        const newScheduledPost = new ScheduledPost({ post: post, date: new Date(post.date) });
        try {
            await newScheduledPost.save()
            res.status(201).json(newScheduledPost);
        } catch (error) {
            res.status(409).json({message: error.message});
        }
    } else { // If the post doesn't have a date, post it immediately
        const newPost = new PostMessage(post)
        newPost.profile_pic = user.profile_pic
        try {
            await newPost.save()
            res.status(201).json(newPost);
        } catch (error) {
            res.status(409).json({message: error.message});
        }
    }
}

export const postScheduledPosts = async () => {
    //console.log("posting scheduled posts")
    // Get all scheduled posts that should be posted by now
    const scheduledPosts = await ScheduledPost.find({ date: { $lte: new Date() } });

    for (let scheduledPost of scheduledPosts) {
        // Create the post
        const post = scheduledPost.post;
        const newPost = new PostMessage(post);
        newPost.profile_pic = post.creator.profile_pic;
        try {
            await newPost.save()
            console.log("Posted a scheduled post.");

            // Delete the scheduled post
            await ScheduledPost.findByIdAndRemove(scheduledPost._id);
        } catch (error) {
            console.log("Error posting a scheduled post: " + error.message);
        }
    }
}


export const deletePost = async (req,res) => {
    const { id } = req.params

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'Post deleted successfully'})
}