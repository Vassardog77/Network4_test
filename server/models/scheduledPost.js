import mongoose from 'mongoose';

const ScheduledPostSchema = mongoose.Schema({
    post: Object,
    date: Date,
});

const ScheduledPost = mongoose.model('ScheduledPost', ScheduledPostSchema);

export default ScheduledPost;
