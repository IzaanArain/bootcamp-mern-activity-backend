const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const validator=require("validator")


const Schema=mongoose.Schema

const userSchema=new Schema({
    fname:{
        type:String,
        required:[true,"please enter first name"],
    },
    lname:{
        type:String,
        required:[true,"please enter last name"],
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"please enter password"]
    }
})

//static signUp method
userSchema.statics.signup=async function(email,password,fname,lname){

    //validation
    if(!email || !password || !fname || !lname){
        throw Error("all fields must be filled")
    }
    // if(!validator.isEmail(email)){
    //     throw Error("Email is not valid")
    // }
    // if(!validator.isStrongPassword(password)){
    //     throw Error("password is not strong enough")
    // }

    const exists=await this.findOne({email})
    // console.log(exists)
    if(exists){
        throw Error("email alraedy in use")
    }

    const salt=await bcrypt.genSalt(10)
    const hashpassword=await bcrypt.hash(password,salt)

    const user=await this.create({email,password:hashpassword,fname,lname})
    return user;
}

//static login method
userSchema.statics.login=async function(email,password){
    //validation
    if(!email || !password){
        throw Error("all fields must be filled")
    }

    const user=await this.findOne({email})
    // console.log(exists)
    if(!user){
        throw Error("incorrect email")
    }

    const match=await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("Incorrecrt password")
    }

    return user

}

module.exports=mongoose.model("User",userSchema)
