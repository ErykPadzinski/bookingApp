import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken";


// REGISTER USER
export const register = async (req, res, next)=> {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })

    const checking = await User.findOne({ username: req.body.username, email: req.body.email })

  try {
    if (checking.username === req.body.username || checking.email === req.body.email) {
      res.send("Wrong inputs")
    }
  } catch(err) {
    res.status(409).send("user details already exist")
  }


    
    await newUser.save()
    res.status(200).send("User has been created")
  } catch(err){
    next(err)
  }

}

//LOGIN USER
export const login = async (req, res, next)=> {
  try {
    const user = await User.findOne({username:req.body.username})
    if(!user) return next(createError(404, "User not found!"))

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordCorrect) return next(createError(400, "Invalid password or username"));

    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);

    // destructure to remove password and option to change to Admin from user
    const {password, isAdmin, ...otherDetails} = user._doc
    res
    .cookie("acces_token", token, {
      httpOnly: true,
    })
     .status(200)
     .send(otherDetails)

 
  } catch(err){
    next(err)
  }
}