const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const passport = require("passport");

const {
  classTypeCreate,
  gymClassCreate,
  classTypetFetch,
  classTypeList,
  classTypeDetail,
} = require("../controllers/classTypeController");

router.param("classTypeId", async (req, res, next, classTypeId) => {
  const classType = await classTypetFetch(classTypeId, next);
  if (classType) {
    req.classType = classType;
    next();
  } else {
    const err = new Error("ClassType Not Found");
    err.status = 404;
    next(err);
  }
});

//ToDo permissions
// const { bakeryFetch } = require("../controllers/bakeryController");

// router.param("classTypeId", async (req, res, next, classTypeId) => {
//   const classType = await classTypetFetch(classTypeId, next);

//   if (classType) {
//     const gymClass = await gymClassFetch(classType.gymClassId, next);
//     req.gymClass = gymClass;
//     req.classType = classType;
//     next();
//   } else {
//     const err = new Error("Product Not Found");
//     err.status = 404;
//     next(err);
//   }
// });
router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),

  classTypeCreate
);
router.post(
  "/:classTypeId/classes",
  // passport.authenticate("jwt", { session: false }),

  gymClassCreate
);
//image in the single is the same name as we named it in the models in the Product.js

router.get("/", classTypeList);

router.get("/:classTypeId", classTypeDetail);

module.exports = router;
