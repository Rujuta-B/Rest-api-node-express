const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const IdController = require("../controllers/place-controller");

router.get("/place/:pid", IdController.placeIdController);

router.get("/:uid", IdController.userIdController);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  IdController.createPlaceController
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  IdController.updatePlaceController
);

router.delete("/:pid", IdController.deletePlaceController);

module.exports = router;
