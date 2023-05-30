import axios from "axios";

var baseurl = "https://api.network770.com"//port changed to 80


if (window.location.origin.includes("localhost")) {
    baseurl = "http://localhost:5000"
} else {
     baseurl = "https://api.network770.com" //port changed to 80
}
export const base_url = baseurl
console.log("working 2")
console.log("base url being used is "+base_url)

const postUrl = base_url+'/posts' //the specific routes that the client is accessing in the server
const FbLoginUrl = base_url+'/login/fb'
const GLoginUrl = base_url+'/login/g'
const DcLoginUrl = base_url+'/login/dc'
const emailUrl = base_url+'/email/send'
const calendarUrl = base_url+'/calendar/post'
const analyticsUrl = base_url+'/analytics/ig'
const profileUrl = base_url+'/profiles/post'
const commentUrl = base_url+'/comment'



//creating the fetchPosts and createPost functions that are used in actions
export const fetchPosts = () => axios.get(postUrl)
export const createPost = (newPost) => axios.post(postUrl, newPost)
export const deletePost = (id) => {axios.delete(`${postUrl}/${id}`)}

export const getFbLogin = (config) => axios.post(FbLoginUrl, config)
.then((response) => {
    localStorage.setItem('facebook_login', true)
    return response
})

export const getGLogin = (config) => axios.post(GLoginUrl, config)
.then((response) => {
    localStorage.setItem('google_login', true)
    return response
})

export const getDcLogin = (config) => axios.post(DcLoginUrl, config)
.then((response) => {
    console.log("discord test?")
    localStorage.setItem('discord_login', true)
    return response
})

export const postEmail = (config) => axios.post(emailUrl, config)
.then((response) => {
    return response
})

export const postCalendarEvent = (config) => axios.post(calendarUrl, config)
.then((response) => {
    return response
})

export const getAnalytics = (config) => axios.get(analyticsUrl, config)
.then((response) => {
    //console.log(response)
    return response
})

export const postProfile = (config) => axios.post(profileUrl, config)
.then((response) => {
    return response
})

export const createComment = (config) => axios.post(commentUrl, config)
.then((response) => {
    //console.log(response)
    return response
})