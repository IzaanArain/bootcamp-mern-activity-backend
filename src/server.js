const express=require("express")
const path=require('path')
const colors=require("colors")
require("dotenv").config()
const cors=require("cors")
const connectDB=require("./config/dbConnection")
const ActivityRoutes=require("./routes/ActivityRoutes")
const UserRoutes=require("./routes/UserRoutes")
const errorHandler = require("./middleware/ErrorHandler")


connectDB()
//express app
const app=express()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
    console.log(req.method,req.path)
    next()
})

//routes

app.use("/api/activities/",ActivityRoutes)
app.use("/api/users/",UserRoutes)
app.use(errorHandler)

app.get('/',(req,res)=>{
    // res.send("<h1>Hello World</h1>")
    res.json({msg:"welcome to the app"})
})
app.get('/:name',(req,res)=>{
    res.send(`<h1>Hello World ${req.params.name}</h1>`)
})

PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}/`)
    console.log(`Server Running on http://localhost:${PORT}/api/users/`)
    console.log(`Server Running on http://localhost:${PORT}/api/activities/`)
})
