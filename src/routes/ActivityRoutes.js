const express = require("express");
const {
  createActivity,
  getAllActivities,
  getActivity,
  updateActivity,
  deleteActivity,
  patchActivity,
} = require("../controllers/ActivityController");
const validateToken = require("../middleware/ValidateToken");

const router = express.Router();
//require authentication for all routes validateToken middleware
router.use(validateToken)

router.route("/")
.get(getAllActivities)
.post(createActivity);

router
  .route("/:id")
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity)
  .patch(patchActivity);

module.exports = router;
