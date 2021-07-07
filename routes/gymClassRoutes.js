const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const passport = require("passport");

const {
  // gymClassFetch,

  gymClassesList,
  gymClassDetail,
} = require("../controllers/gymClassController");

// const { bakeryFetch } = require("../controllers/bakeryController");

// router.param("", async (req, res, next, productId) => {
//   const product = await productFetch(productId, next);

//   if (product) {
//     const bakery = await bakeryFetch(product.bakeryId, next);
//     req.bakery = bakery;
//     req.product = product;
//     next();
//   } else {
//     const err = new Error("Product Not Found");
//     err.status = 404;
//     next(err);
//   }
// });

//image in the single is the same name as we named it in the models in the Product.js

router.get("/", gymClassesList);

router.get("/:gymClassId", gymClassDetail);

// router.delete(
//   "/:productId",
// //   passport.authenticate("jwt", { session: false }),
//   productDelete
// );

module.exports = router;
