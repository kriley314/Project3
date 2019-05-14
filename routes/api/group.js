const router = require("express").Router();
const userController = require("../../controllers/groupController");

// Matches with "/api/group"
router.route("/")
  .get(groupController.findAll)
  .post(groupController.create);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(groupController.findById)
  .put(groupController.update)
  .delete(groupController.remove);

module.exports = router;
