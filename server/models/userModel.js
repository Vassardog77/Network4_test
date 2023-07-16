import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const Schema = mongoose.Schema  

const userSchema = new Schema({
  screen_name: {
    type: String,
    required: false,
    unique: false
  },
  profile_pic: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  account_type: {
    type: String,
  }
})

// static signup method
userSchema.statics.signup = async function(screen_name,profile_pic,email, password) {

  console.log(email)

  // validation
  if (!screen_name || !email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ screen_name,profile_pic,email, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  console.log(email)

  if (!email || !password) {
    console.log("normal error")
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password) //originally both were password
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}


const User = mongoose.model('User', userSchema)
export default User