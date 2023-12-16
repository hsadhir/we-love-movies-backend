const express = require("express");
const controller = require("../controllers/theaters");
const { methodNotAllowed } = require("../../utils/errors");

const router = express.Router();

router.route("/").get(controller.getAllTheaters).all(methodNotAllowed);

module.exports = router;
