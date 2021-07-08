const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const passport = require("passport");

const {
  sessionFetch,
  sessionList,
  sessionDetail,
} = require("../controllers/sessionController");

// const { bakeryFetch } = require("../controllers/bakeryController");

router.param("sessionId", async (req, res, next, sessionId) => {
  const session = await sessionFetch(sessionId, next);
  // const bakery = await sessionFetch(session.bakeryId, next);

  if (session) {
    req.session = session;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

//image in the single is the same name as we named it in the models in the Product.js

router.get("/", sessionList);

router.get("/:sessionId", sessionDetail);

// router.delete(
//   "/:productId",
// //   passport.authenticate("jwt", { session: false }),
//   productDelete
// );

module.exports = router;
