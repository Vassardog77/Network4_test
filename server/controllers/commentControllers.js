import PostMessage from "../models/postMessage.js"

export const postComment = async (req, res) => {
    const { id, user, comment } = req.body;
    try {
        const post = await PostMessage.findById(id);
        
        if (!post) {
            return res.status(404).send({ message: "No post found" });
        }

        // We are assuming the comment structure to be {user, comment} in array
        post.comments.push({ user, comment });
        
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        //console.log(updatedPost);

        res.json(updatedPost);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
