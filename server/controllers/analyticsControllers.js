import axios from "axios"
import ApiToken from "../models/apiToken.js"
import Page from "../models/page.js"

export const getIgAnalytics = async (req, res) => { //webook endpoints
    const user = req.body.user //getting email from request body 

    const FbToken = await ApiToken.findOne({media: "facebook", user: user })

    if (FbToken) {
      const todays_date = new Date()
      let current_month = (todays_date.getMonth()+1)
      let start_month = String(current_month-1).padStart(2, '0')
      let end_month = String(current_month).padStart(2, '0')
      let end_date = String(todays_date.getDate()).padStart(2, '0')
      let days_in_last_month = new Date(2023, (current_month-1), 0).getDate()
      let start_date = 1

      if (days_in_last_month < end_date) { //making sure it doesn't ask for a start date greater than the days in last month
        start_date = days_in_last_month
        if (end_date === "31") { //making sure the period requested is not more than 30 days
          start_month++
        start_date = '01'
        }
      } else if (end_date === "31") {
        start_month++
        start_date = '01'
      } else {
        start_date = end_date
      }
    
    if (end_date !== "01") {
      end_date =  String(todays_date.getDate()-1).padStart(2, '0')
    }

      var config = {
          method: 'get',
          url: 'https://graph.facebook.com/17841422229166819/insights?metric=profile_views,reach,impressions&period=day&'+
          'since=2023-'+start_month+'-'+start_date+'&'+
          'until=2023-'+end_month+'-'+end_date,
          headers: { 
            'Authorization': 'Bearer '+ FbToken.access_token
          }
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          res.status(200).json(response.data)
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).json({ error })
        }); 
    } else {
      res.status(500).json("not logged in")
    }
}

export const getFbAnalytics = async (req, res) => { //webook endpoints

  const FbToken = await Page.findOne({id: "101989732541801"})
  if (FbToken) {

  var config = {
      method: 'get',
      url: 'https://graph.facebook.com/101989732541801/insights?metric=page_engaged_users,page_consumptions_by_consumption_type,page_fans_online',
      headers: { 
        'Authorization': 'Bearer '+ FbToken.access_token
      }
    };
    
    axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      res.status(200).json(response.data)
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ error })
    });
  } else {
    res.status(500).json("not logged in")
  }
}