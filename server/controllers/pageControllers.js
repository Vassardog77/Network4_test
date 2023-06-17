import ApiToken from "../models/apiToken.js"
import Page from "../models/page.js"
import axios from 'axios'

export const getFbPages = async (req, res) => { //getting fb pages for getting ig login
    
    const FbToken = await ApiToken.findOne({media: "facebook", user: req.body.user})
    await Page.deleteMany({media: "facebook", user: req.body.user})                                        //delete old values
    console.log(req.body.user)

    var config = {                                                  //setting config variables
        method: 'get',
      maxBodyLength: Infinity,
        url: 'https://graph.facebook.com/v14.0/me/accounts?',
        headers: { 
          'Authorization': 'Bearer '+FbToken.access_token
        }
      };
      
      axios(config)
      .then(async function (response) {
        const data = await response.data.data.map(media => ({...media, media:'facebook'}))

        data.forEach(async element => {
            const newPage = new Page(element)            //setting the value for mongodb (FIX FOREACH)
            await newPage.save()                          //saving the value to mongodb 
        }) 

        //console.log(response.data.data)
        res.status(200).json(data)
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json({ error })
      })
}