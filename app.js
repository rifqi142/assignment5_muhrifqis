require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./config/swagger-output.json");

const customerRoutes = require("./routes/customer.route");
const addressRoutes = require("./routes/address.route");
const contactRoutes = require("./routes/contact.route");
const orderRoutes = require("./routes/order.route");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Customers Data API",
    code: 200,
  });
});

app.use("/customers", customerRoutes);
app.use("/addresses", addressRoutes);
app.use("/contacts", contactRoutes);
app.use("/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
