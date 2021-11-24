const express = require("express");
const router = express.Router();

const aboutController = require("../controllers/aboutController");

router.post("/xyz/about", aboutController.postAbout);
router.get("/stats", aboutController.getAbout);

module.exports = router;
