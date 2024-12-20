const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

const {
  getAllAddress,
  getAddressById,
  createAddress,
} = require("../controllers/address.controller");

const {
  getAllContact,
  getContactById,
  createContact,
} = require("../controllers/contact.controller");

const {
  getAllOrder,
  getOrderById,
  createOrder,
} = require("../controllers/order.controller");

// Customer
// [GET] /customers
router.get("/", getAllCustomers);

// [GET] /customers/:id
router.get("/:id", getCustomerById);

// [POST] /customers
router.post("/", createCustomer);

// [PUT] /customers/:id
router.put("/:id", updateCustomer);

// [DELETE] /customers/:id
router.delete("/:id", deleteCustomer);

// address
// [GET] customers/:id/address
router.get("/:id/addresses", getAllAddress);

// [GET] customers/:id/address/:id
router.get("/:id/addresses/:id", getAddressById);

// [POST] customers/:id/address
router.post("/:id/addresses", createAddress);

// contact
// [GET] customers/:id/contact
router.get("/:id/contacts", getAllContact);

// [GET] customers/:id/contact/:id
router.get("/:id/contacts/:id", getContactById);

// [POST] customers/:id/contact
router.post("/:id/contacts", createContact);

// order
// [GET] customers/:id/order
router.get("/:id/orders", getAllOrder);

// [GET] customers/:id/order/:id
router.get("/:id/orders/:id", getOrderById);

// [POST] customers/:id/order
router.post("/:id/orders", createOrder);

module.exports = router;
