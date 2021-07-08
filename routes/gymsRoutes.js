const express = require("express");
const upload = require("../middleWare/multer");
const router = express.Router();

const {
  gymFetch,
  gymCreate,
  gymList,
  gymDetail,
  createOwner,
  //   gymUpdate,
  //   gymDelete,
} = require("../controllers/gymController");

router.param("gymId", async (req, res, next, gymId) => {
  const gym = await gymFetch(gymId, next);
  if (gym) {
    req.gym = gym;
    next();
  } else {
    const err = new Error("Gym Not Found");
    err.status = 404;
    next(err);
  }
});
//image is the name of the field in the model
router.post("/", upload.single("image"), gymCreate);
// router.post("/:gymId/products", upload.single("image"), productCreate);
router.get("/", gymList);

router.get("/:gymId", gymDetail);

router.get("/aa/:userId", createOwner);

// router.put("/:gymId", upload.single("image"), gymUpdate);

// router.delete("/:gymId", gymDelete);

module.exports = router;
