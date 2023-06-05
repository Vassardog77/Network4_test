import url from 'url'
import needle from 'needle'
import ApiToken from "../models/apiToken.js"

export const getFbMessages = async (req, res) => { //getting messages from fb page
    try {
        const PageToken = await ApiToken.findOne({media: "instagram"})
        const apiRes = await needle('get', `https://graph.facebook.com/v15.0/101989732541801/conversations?fields=unread_count,snippet,messages{message}&platform=messenger&access_token=`+PageToken.access_token)
        const data = apiRes.body       
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

export const getIgMessages = async (req, res) => { //getting messages from ig page
    try {
        const PageToken = await ApiToken.findOne({media: "instagram"})
        const apiRes = await needle('get', `https://graph.facebook.com/v15.0/101989732541801/conversations?fields=unread_count,snippet,messages{message}&platform=instagram&access_token=`+PageToken.access_token)
        const data = apiRes.body       
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}