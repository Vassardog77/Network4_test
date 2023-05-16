import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()



const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
export const loginUser = async (req, res) => {
  const {email, password} = req.body
  //console.log(email)

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    const user_object = await User.findOne({email: email})
    const screen_name = user_object.screen_name
    const profile_pic = user_object.profile_pic

    res.status(200).json({screen_name, profile_pic, email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
export const signupUser = async (req, res) => {
  const {screen_name, profile_pic, email, password} = req.body
  console.log(req.body)
  //console.log(email)
  try {
    const user = await User.signup(screen_name, profile_pic, email, password)
    // create a token
    const token = createToken(user._id)

    res.status(200).json({screen_name, profile_pic, email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


export const getUsers = async (req, res) => {
  try {
    const users = await User.find()

    users.forEach(element => {
      element.profile_pic = ""
    });

    res.status(200).json(users)
  } catch (error) {
    
  }
  res.status(400)
}