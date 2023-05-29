const mongoose=require("mongoose");

const Schema=mongoose.Schema

const ActivitySchema=new Schema({
    user_id:{
        type:String,
        required:true
    },
    activityType:{
        type:String,
        required:[true,"please select activity"]
    },
    duration:{
        type:String,
        required:[true,"please enter duration"]
    },
    date:{
        type:String,
        required:[true,"please enter date"]
    },
    description:{
        type:String,
        required:[true,"please enter a description"]
    },
    image:{
        type:String,
        default:" "
    },
},
{
    timestamps:true,
})

module.exports=mongoose.model("Activities",ActivitySchema)

