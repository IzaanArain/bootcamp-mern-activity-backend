const Activities = require("../models/ActivityModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

//@desc fetch all activities
//@route GET /api/todos
//@access Private
const getAllActivities = asyncHandler(async (req, res) => {
    // const activities = await Activities.find();
    const user_id=req.user._id

    const activities = await Activities.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json(activities);
});

//@desc create a single activity
//@route POST /api/activities/
//@access Private
const createActivity = asyncHandler(async (req, res) => {
  const { activityType, description, duration, date, image } = req.body;

  if (!activityType || !duration || !date || !description) {    
    res.status(400);
    throw new Error("all field are mandatory");
  }
// let emptyFields=[]
// if(!activityType){
//     emptyFields.push("activityType")
// }
// if(!duration){
//     emptyFields.push("duration")
// }
// if(!date){
//     emptyFields.push("date")
// }
// if(!description){
//     emptyFields.push("description")
// }
// if(!image){
//     emptyFields.push("image")
// }

// if(emptyFields.length>0){
//     req.status(400)
//     throw new Error("please fill all the fields",emptyFields)
// }


const user_id=req.user._id

    const activity = await Activities.create({
      activityType,
      description,
      duration,
      date,
      image,
      user_id
    });
    res.status(200).json(activity);
});

//@desc fetch a single activity
//@route GET /api/activities/:id
//@access Private
const getActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
      throw new Error("No such Activity")
    }
    const activity = await Activities.findById(id);
    if (!activity) {
       res.status(404)
       throw new Error("No such Activity")
    } else {
      res.status(200).json(activity);
    }
  
});

//@desc update a single activity
//@route PUT /api/activities/:id
//@access Private
const updateActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
      throw new Error("No such Activity")
    }
    const activity = await Activities.findById(id);
    if (!activity) {
      res.status(404)
      throw new Error("No such Activity")
    } else {
      //   const updatedActivity = await Activities.findByIdAndUpdate(
      //     id,
      //     req.body, {
      //     new: true,
      //   });
      const updatedActivity = await Activities.findByIdAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      );
      res.status(200).json(updatedActivity);
    }
  
});

//@desc delete a single activity
//@route DELETE /api/activities/:id
//@access Private
const deleteActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
      throw new Error("No such Activity")
    }
    const activity = await Activities.findById(id);
    if (!activity) {
      res.status(404)
      throw new Error("No such Activity")
    } else {
      // const deletedActivity = await Activities.findByIdAndDelete(id);
      const deletedActivity = await Activities.findByIdAndDelete({ _id: id });
      res.status(200).json(deletedActivity);
    }
});

//@desc update values in a single activity
//@route PATCH /api/activities/:id
//@access Private
const patchActivity = asyncHandler(async (req, res) => {
  res.json({ msg: `PATCH update values in activity at id:${req.params.id}` });
});

module.exports = {
  createActivity,
  getAllActivities,
  getActivity,
  updateActivity,
  deleteActivity,
  patchActivity,
};
