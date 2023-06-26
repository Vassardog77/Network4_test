import axios from "axios"
import ApiToken from "../models/apiToken.js"
import * as dotenv from 'dotenv'
//import { calendar } from "googleapis/build/src/apis/calendar/index.js"
dotenv.config()

export const postEmails = async (req, res) => { //sending email through gmail
    var data = JSON.stringify(req.body) //the email from the client
    const user = req.body.user //getting email from request body 
    const GToken = await ApiToken.findOne({media: "google", user: user })

    //console.log(data)
      var config = {
        method: 'post',
        url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        headers: {
          'Authorization': 'Bearer '+ GToken.access_token,
          'Content-Type': 'application/json'
        },
        data : data
      };

      await axios(config)
              .then(function(response) {
                //console.log(response.body)
                res.status(200).json(data)
              })
              .catch(function(error) {
              res.status(500).json({ error })
              })
}




export const getEmails = async (req, res) => { //sending email through gmail
  let user = req.body.user
    
  const GToken = await ApiToken.findOne({media: "google", user: user})


  let email_callback = async(email_array, return_array) => {
    email_array.forEach(async element => {
      var config = {
        method: 'get',
        url: 'https://gmail.googleapis.com/gmail/v1/users/benmoxon256%40gmail.com/messages/'+element.id+'?key='+process.env.gapiKey,
        headers: {
          'Authorization': 'Bearer '+ GToken.access_token,
          'Content-Type': 'application/json'
        }
      }
      
      await axios(config)
      .then(async(response) => {
        await return_array.push(response.data)
        //console.log("return array = "+return_array)

      })
      .catch(function(error) {
        console.log(error)
        res.status(500).json({ error })
      })

    })
    let timeoutId
    timeoutId = setTimeout(() => {
      console.log("sending to client now")
      console.log(return_array)
      return(return_array)
    }, 1000);
  }
  

    var config = {
      method: 'get',
      url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5&key='+process.env.gapiKey,
      headers: {
        'Authorization': 'Bearer '+ GToken.access_token,
        'Content-Type': 'application/json'
      }
    }


    await axios(config)
            .then(function(response) {
              //console.log(response)
              let return_array = []
              console.log("emails="+ email_callback(response.data.messages, return_array))
              res.status(200).json(email_callback(response.data.messages, return_array))
            })
            .catch(function(error) {
              console.log(error)
              res.status(500).json({ error })
            })
}