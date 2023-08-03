import axios from 'axios'
import qs from 'qs'
import ApiToken from "../models/apiToken.js"
import Secret from '../models/secrets.js'
import Page from "../models/page.js"


export const getFbLogin = async (req, res) => { //facebook login fucntion
    const fbvalues = await Secret.findOne({media: "facebook"})         //get parameter values from database
    var redirect_uri = req.body.redirect_uri
    var code = req.body.code 
    var user = req.body.user
    var config = {                                                                          //setting values for request
        method: 'get',
      maxBodyLength: Infinity,
        url: 'https://graph.facebook.com/v15.0/oauth/access_token?'+
        'code='+ code +
        '&redirect_uri='+ redirect_uri +
        '&client_id='+fbvalues.client_id+
        '&client_secret='+fbvalues.secret
      }
      await ApiToken.deleteMany({media: "facebook",user:user})     //delete old values (add ,user:user as check)
      axios(config)
      .then(async function (response) {
        const data = response.data
        data.media = 'facebook'
        data.user = user
        //console.log(data)
        const newToken = new ApiToken(data)            //setting the value for mongodb    
        await newToken.save()                          //saving the value to mongodb 
        //console.log(JSON.stringify(response.data))
        res.status(200).json(response.data)
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json({ error })
      })    

} 



export const getGLogin = async (req, res) => {  //google login fucntion
    const gvalues = await Secret.findOne({media: "google"})         //get parameter values from database
    var redirect_uri = req.body.redirect_uri 
    var code = req.body.code 
    var user = req.body.user
    var config = {                                                                          //setting values for request
        method: 'post',
      maxBodyLength: Infinity,
        url: 'https://oauth2.googleapis.com/token?'+
        'code='+ code +
        '&redirect_uri='+ redirect_uri +
        '&client_id='+gvalues.client_id+
        '&client_secret='+gvalues.secret+
        '&grant_type=authorization_code'
      }
      await ApiToken.deleteMany({media: "google",user:user})           //delete old values (add ,user:user as check)
      axios(config)
      .then(async function (response) {
        const data = response.data
        data.media = 'google'
        data.user = user
        //console.log(data)
        const newToken = new ApiToken(data)            //setting the value for mongodb    
        await newToken.save()                          //saving the value to mongodb 
        //console.log(JSON.stringify(response.data))
        res.status(200).json(response.data)
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json({ error })
      })    
}



export const getIgLogin = async (req, res) => { //instagram login function
    const PageId = req.body.id                  //get Fb page Id that was past from client
    var user = req.body.user
    console.log(req.body)
    const FbToken = await ApiToken.findOne({media: "facebook",user:user})
    const FbPageMatch = await Page.findOne({id: PageId})  //Getting the fbpage element that has the ig account attached
    await ApiToken.deleteMany({media: "instagram",user:user})                                        //delete old values
    console.log(FbPageMatch.id)


    var config = {
        method: 'get',
      maxBodyLength: Infinity,
        url: 'https://graph.facebook.com/v14.0/'+FbPageMatch.id+'?fields=instagram_business_account',
        headers: { 
          'Authorization': 'Bearer '+ FbToken.access_token
        }
      }

    axios(config)
        .then(async function (response) {
            const newToken = new ApiToken()            //setting the value for mongodb
            newToken.media = 'instagram'
            newToken.access_token = FbPageMatch.access_token  //saving fb page access token as ig access token in database
            newToken.user = user
            await newToken.save()                          //saving the value to mongodb    
            await Page.deleteMany({media: "instagram",user:user}) //creating new page element in database for ig page (add ,user:user as check)
            const newPage = new Page()
            newPage.media = 'instagram'
            newPage.user = user
            newPage.name = FbPageMatch.name             //setting the ig page to have the same name as its matching facebook page
            newPage.access_token = FbPageMatch.access_token //setting the ig page to have the same access token as its matching facebook page
            newPage.id = response.data.instagram_business_account.id //setting the ig page to have the ig page id
            await newPage.save()
            res.status(200).json(response.data)
          })
          .catch(function (error) {
            console.log(error)
            res.status(500).json({ error })
          })
    
}



export const getDiscLogin = async (req, res) => {  //discord login function
    const dcvalues = await Secret.findOne({media: "discord"})         //get parameter values from database
    var redirect_uri = req.body.redirect_uri 
    var code = req.body.code 
    var user = req.body.user

    var data = qs.stringify({
        'code': code,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code',
        'client_secret': dcvalues.secret,
        'client_id': dcvalues.client_id 
      })

    var config = {                                                                          //setting values for request
        method: 'post',
      maxBodyLength: Infinity,
        url: 'https://discord.com/api/v10/oauth2/token',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
          data : data
    }
      await ApiToken.deleteMany({media: "discord"})     //delete old values (add ,user:user as check)
      axios(config)
      .then(async function (response) {
        const data = response.data
        data.media = 'discord'
        data.user = user
        //console.log(data)
        const newToken = new ApiToken(data)            //setting the value for mongodb    
        await newToken.save()                          //saving the value to mongodb 
        //console.log(JSON.stringify(response.data))
        res.status(200)//.json(response.data)
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json({ error })
      })    
}
