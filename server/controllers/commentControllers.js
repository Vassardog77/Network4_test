import PostMessage from "../models/postMessage.js"
import { v4 as uuidv4 } from 'uuid';

export const postComment = async (req, res) => {
    console.log(req.body)
    const { postId, parentCommentId, user, comment, reply } = req.body;

    try {
        const post = await PostMessage.findById(postId);
        
        if (!post) {
            return res.status(404).send({ message: "No post found" });
        }

        // Check if this is a reply to a comment
        if (parentCommentId) {
            // Find the parent comment
            const parentCommentIndex = post.comments.findIndex(cmt => cmt.id === parentCommentId);

            // If no parent comment found, return error
            if (parentCommentIndex === -1) {
                return res.status(404).send({ message: "No parent comment found" });
            }

            // If it is a reply, push it into the parent comment's replies array
            post.comments[parentCommentIndex].replies.push({ user, reply, id: uuidv4() });

            // Mark the replies array as modified
            post.markModified('comments');
        } else {
            // Otherwise, create a new comment and push it into the post's comments array
            post.comments.push({ user, comment, id: uuidv4(), replies: [] });
        }

        // Save the updated post
        const updatedPost = await post.save();

        res.json(updatedPost);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
