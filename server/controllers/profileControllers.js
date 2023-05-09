import Profile from "../models/profiles.js"
import User from "../models/userModel.js"

export const postProfile = async (req, res) => { //sending email through gmail

    var data = req.body //the email from the client
    await Profile.deleteMany({user: req.body.user})             //delete old profile


    const newProfile = await new Profile(data)

    try {
        await newProfile.save()

        res.status(201).json(newProfile)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getProfile = async (req, res) => { //sending email through gmail

    var username = req.body //the username from the client

    const profile = await Profile.findOne({user: username.data})

    console.log(username.data)

    try {
        res.status(201).json(profile)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}