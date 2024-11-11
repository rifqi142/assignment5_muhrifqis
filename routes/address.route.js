const express = require("express");
const router = express.Router();

const {
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");

// [PUT] /addresses/:id
router.put("/:id", updateAddress);

// [DELETE] /addresses/:id
router.delete("/:id", deleteAddress);

module.exports = router;
