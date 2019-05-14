const router = require("express").Router();
const userRoutes = require("./user");
const groupRoutes = require("./group")

router.use("/users", userRoutes);
router.use("/groups", groupRoutes);

module.exports = router