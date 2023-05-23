import mongoose from "mongoose"

const s3Schema = mongoose.Schema({
    name:String,
    region:String,
    secret:String,
    access_key:String
})
const S3 = mongoose.model('S3', s3Schema)
export default S3