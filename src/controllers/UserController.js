const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_TOKEN, { expiresIn: "1d" });
};

//login user
const loginUser = async (req, res) => {
    const {email,password}=req.body
    try {
        const user = await User.login(email, password);
        const {fname,lname}=user
        //create token
        const token = createToken(user._id);
        // console.log(user)
        res.status(200).json({ email,fname,lname, token });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
//   res.status(200).json({ msg: "login user" });
};


//signUpUser
const signUpUser = async (req, res) => {
  const { email, password, fname, lname } = req.body;
  // console.log(req.body)
  try {
    const user = await User.signup(email, password, fname, lname);

    //create token
    const token = createToken(user._id);
    // console.log(user)
    res.status(200).json({ email,fname,lname, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.status(200).json({msg:"working"})
};

module.exports = {
  loginUser,
  signUpUser,
};
