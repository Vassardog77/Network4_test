import axios from 'axios'
import ApiToken from "../models/apiToken.js"

export const postEvents = async (req, res) => {

    const user = req.body.user //getting email from request body 
    const GToken = await ApiToken.findOne({media: "google", user: user })

    var data = JSON.stringify(req.body.data) //the event from the client

    if (GToken) {
    
      var config = {
        method: 'post',
        url: 'https://www.googleapis.com/calendar/v3/calendars/benmoxon256@gmail.com/events',
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
              //console.log(error.response)
              res.status(500).json({ error })
              })
    } else {
      res.status(401).json({ error })
    }
}


export const getEvents = async (req, res) => { //getting calaendar events

  const user = req.body.user //getting email from request body 
  const uri_encoded_user = encodeURIComponent(user) //(must be uri encoded to work)
    
  const GToken = await ApiToken.findOne({media: "google", user: user })
  const todays_date = new Date()
  let current_month = (todays_date.getMonth()+1)
  let start_month = String(current_month).padStart(2, '0')
  let end_month = String(current_month+1).padStart(2, '0')

  if (GToken) {

    var config = {
      method: 'get',
      url: 'https://www.googleapis.com/calendar/v3/calendars/'+uri_encoded_user+'/events?timeMax=2023-'
            +end_month
            +'-01T00%3A00%3A00.000Z&timeMin=2023-'
            +start_month
            +'-01T00%3A00%3A00.000Z&key='
            +process.env.gapiKey,
      headers: {
        'Authorization': 'Bearer '+ GToken.access_token,
        'Content-Type': 'application/json'
      }
    };

    await axios(config)
            .then(function(response) {
              //console.log(response)
              res.status(200).json(response.data)
            })
            .catch(function(error) {
              //console.log(error.response.data.error)
              res.status(500).json({ error })
            })
  } else {
    res.status(401).json("no google account")
  }
}

