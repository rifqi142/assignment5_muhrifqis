const express = require("express");
const router = express.Router();

const { updateOrder, deleteOrder } = require("../controllers/order.controller");

// [PUT] /orders/:id
router.put("/:id", updateOrder);

// [DELETE] /orders/:id
router.delete("/:id", deleteOrder);

module.exports = router;
