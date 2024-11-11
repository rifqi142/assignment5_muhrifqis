const express = require("express");
const router = express.Router();

const {
  updateContact,
  deleteContact,
} = require("../controllers/contact.controller");

// [PUT] /contacts/:id
router.put("/:id", updateContact);

// [DELETE] /contacts/:id
router.delete("/:id", deleteContact);

module.exports = router;
