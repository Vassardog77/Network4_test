import axios from "axios"
import Page from "../models/page.js";
import S3 from "../models/s3.js"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';


/*export const postFbPosts = async (req, res) => { //webook endpoints

    const FbPageToken = await Page.findOne({name: "Network_Test"})

    var config = {
        method: 'post',
        url: 'https://graph.facebook.com/101989732541801/photos?url=https://source.unsplash.com/user/c_v_r&access_token='+FbPageToken.access_token,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
        res.status(200).json(response.data)
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json({ error })
      })
}*/


export const postIgPosts = async (req, res) => {
  const user = req.body.user
  const FbPage = await Page.findOne({media: "instagram", user:user})
  const insta_id = FbPage.id

  let creation_id = req.body.creation_id

  console.log(req.body.creation_id)

  var config = {
      method: 'post',
      url: 'https://graph.facebook.com/v16.0/'+insta_id+'/media_publish?creation_id='+creation_id,
      headers: { "Authorization": "Bearer "+FbPage.access_token }
    };
    
    axios(config)
    .then(function (response) {
      res.status(200).json(response.data)
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).json({ error })
    })
}



export const prepIgPosts = async (req, res) => {
  const user = req.body.creator
  const FbPage = await Page.findOne({media: "instagram", user:user})
  const insta_id = FbPage.id
  const s3_info = await S3.findOne()

  const s3Client = new S3Client({
    region: s3_info.region,
    credentials: {
      accessKeyId: s3_info.access_key,
      secretAccessKey: s3_info.secret,
    },
  });

  // assuming the base64 encoded string is sent in a field named 'image'
  let base64Image = req.body.selectedFile;
  let mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1]; // Extract mimetype
  let ext = mimeType.split('/')[1]; // Extract image extension
  let fileName = Date.now() + '.' + ext; // You can use any unique naming logic
  
  // Remove the "data:image/jpeg;base64," part from the image string
  let base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  
  // convert base64 to binary
  let buf = Buffer.from(base64Data, 'base64');

  // setup s3 params
  let params = {
    Bucket: s3_info.name,
    Key: fileName,
    Body: buf,
    ContentType: mimeType,
    //ACL: 'public-read', // Makes the uploaded file publicly readable
  };

    const data = await s3Client.send(new PutObjectCommand(params));
    // Construct the URL of the uploaded image
    const imageUrl = `https://${params.Bucket}.s3.${s3_info.region}.amazonaws.com/${params.Key}`;


  //================================================================================================================

  var config = {
      method: 'post',
      url: 'https://graph.facebook.com/v16.0/'+insta_id+'/media?image_url='+imageUrl+'&caption='+req.body.message,
      headers: { "Authorization": "Bearer "+FbPage.access_token }
    };
    
    axios(config)
    .then(function (response) {
      res.status(200).json(response.data)
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).json({ error })
    })
}