import PostMessage from "../models/postMessage.js"

export const likePost = async (req, res) => {
    const { id, user, adding } = req.body; // Extract data from the request body
    
    // Find the post by id
    let post;
    try {
        post = await PostMessage.findOne({_id: id});
    } catch (error) {
        return res.status(404).send('No post with that id');
    }
    //console.log(post)

    // Initialize post.likes and post.likes.likeArray if they don't exist
    if (!post.likes) {
        console.log("initializing likes array")
        post.likes = {likeCount: 0, likeArray: []};
    } else if (!post.likes.likeArray) {
        post.likes.likeArray = [];
    }
    
    // If adding is true, the user is liking the post
    if (adding) {
        if (!post.likes.likeArray.includes(user)) { // Only add the user to the likeArray if they haven't liked the post already
            post.likes.likeArray.push(user);
        }
    }
    // If adding is false, the user is unliking the post
    else {
        const index = post.likes.likeArray.indexOf(user);
        if (index > -1) { // Only remove the user from the likeArray if they're in it
            post.likes.likeArray.splice(index, 1);
        }
    }
    
    // Update likeCount to match the length of the likeArray
    post.likes.likeCount = post.likes.likeArray.length;

    // Save the updated post to the database
    try {
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        return res.status(500).send('Error saving the post');
    }
}


export const likePost2 = async (req, res) => {
    // Get all posts
    const posts = await PostMessage.find({});

    // Iterate over each post
    for (let post of posts) {
        // If post.likes doesn't exist, initialize it
        if (!post.likes) {
            post.likes = {likeCount: 0, likeArray: []};
        }

        // If post.likeCount exists, remove it
        if (post.likeCount !== undefined) {
            post.likeCount = undefined; // set it to undefined
        }

        // Save the updated post
        try {
            await post.save();
        } catch (error) {
            console.log('Error saving the post:', error);
        }
    }

    console.log('Finished updating posts');
}

