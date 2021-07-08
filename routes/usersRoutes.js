const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signup,
  signin,
  userFetch,
  userDetail,
  sessionCreate,
  userList,
} = require("../controllers/userController");

router.param("userId", async (req, res, next, userId) => {
  const user = await userFetch(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("Gym Not Found");
    err.status = 404;
    next(err);
  }
});

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);
router.get("/:userId", userDetail);
router.get("/", userList);

router.post(
  "/:userId/sessions",
  // passport.authenticate("jwt", { session: false }),

  sessionCreate
);
module.exports = router;
