const express=require("express")
//controller functions
const { loginUser, signUpUser } = require("../controllers/UserController")

const router=express.Router()

//login route
router.route("/login").post(loginUser)

//signUp route
router.route("/register").post(signUpUser)

module.exports=router