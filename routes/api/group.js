const router = require("express").Router();
const groupController = require("../../controllers/groupController");

// Matches with "/api/group"
router.route("/")
  .get(groupController.findAll)
  .post(groupController.create);

// Matches with "/api/group/:id"
router
  .route("/:id")
  .get(groupController.findById)
  .put(groupController.update)
  .delete(groupController.remove);

module.exports = router;
