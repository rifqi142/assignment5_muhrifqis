const {
  successResponseCreatedData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
  errorNotFoundResponse,
} = require("../helpers/responseHelpers");

const { Customer, Order } = require("../models");

// get all order
const getAllOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.findAll({
      where: {
        ord_cs_id: id,
      },
      attributes: {
        exclude: ["ord_createdAt", "ord_updatedAt"],
      },
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (!orders || orders.length === 0) {
      return errorNotFoundResponse(
        res,
        "No orders found for this customer",
        404
      );
    }

    const formattedOrders = orders.map((order) => {
      const formattedOrder = {
        ...order.toJSON(),
        ord_date: order.ord_date
          ? new Date(order.ord_date).toISOString().split("T")[0]
          : null,
      };

      if (formattedOrder.customer) {
        formattedOrder.customer = {
          ...formattedOrder.customer,
          cs_birthDate: formattedOrder.customer.cs_birthDate
            ? new Date(formattedOrder.customer.cs_birthDate)
                .toISOString()
                .split("T")[0]
            : null,
        };
      }

      return formattedOrder;
    });

    return successResponse(
      res,
      "Success get all orders for customer",
      200,
      formattedOrders
    );
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// get order by id
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      attributes: {
        exclude: ["ord_createdAt", "ord_updatedAt"],
      },
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (!order) {
      return errorNotFoundResponse(res, "Order not found", 404);
    }

    const formattedOrder = {
      ...order.toJSON(),
      ord_date: order.ord_date
        ? new Date(order.ord_date).toISOString().split("T")[0]
        : null,
    };

    if (formattedOrder.customer) {
      formattedOrder.customer = {
        ...formattedOrder.customer,
        cs_birthDate: formattedOrder.customer.cs_birthDate
          ? new Date(formattedOrder.customer.cs_birthDate)
              .toISOString()
              .split("T")[0]
          : null,
      };
    }

    return successResponse(res, "Success get order by id", 200, formattedOrder);
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// create order
const createOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { ord_date, ord_status, ord_totalAmount } = req.body;

    if (!ord_date || !ord_status || !ord_totalAmount) {
      return errorClientResponse(res, "All fields must be filled", 400);
    }

    const customer = await Customer.findByPk(id, {
      attributes: {
        exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
      },
    });

    if (!customer) {
      return errorNotFoundResponse(res, "Customer not found", 404);
    }

    const order = await Order.create({
      ord_cs_id: id,
      ord_date,
      ord_status,
      ord_totalAmount,
    });

    const formattedOrder = {
      ord_id: order.ord_id,
      ord_cs_id: order.ord_cs_id,
      ord_date: order.ord_date
        ? new Date(order.ord_date).toISOString().split("T")[0]
        : null,
      ord_status: order.ord_status,
      ord_totalAmount: order.ord_totalAmount,
    };

    return successResponseCreatedData(
      res,
      "Success create order",
      201,
      formattedOrder
    );
  } catch (error) {
    console.log("Error:", error);
    return errorServerResponse(res, "Internal server error", 500);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { ord_date, ord_status, ord_totalAmount } = req.body;

    if (!ord_date || !ord_status || !ord_totalAmount) {
      return errorClientResponse(res, "All fields must be filled", 400);
    }

    const order = await Order.findByPk(id, {
      attributes: {
        exclude: ["ord_createdAt", "ord_updatedAt"],
      },
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (!order) {
      return errorNotFoundResponse(res, "Order not found", 404);
    }

    const previousDataOrder = { ...order.dataValues };

    if (previousDataOrder.customer) {
      previousDataOrder.customer = {
        ...previousDataOrder.customer.toJSON(),
        cs_birthDate: previousDataOrder.customer.cs_birthDate
          ? new Date(previousDataOrder.customer.cs_birthDate)
              .toISOString()
              .split("T")[0]
          : null,
      };
    }

    previousDataOrder.ord_date = new Date(previousDataOrder.ord_date)
      .toISOString()
      .split("T")[0];

    delete previousDataOrder.ord_createdAt;
    delete previousDataOrder.cs_createdAt;

    await Order.update(
      {
        ord_date,
        ord_status,
        ord_totalAmount,
      },
      {
        where: {
          ord_id: id,
        },
      }
    );

    const updatedOrder = await Order.findByPk(id, {
      attributes: {
        exclude: ["ord_createdAt", "ord_updatedAt"],
      },
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (updatedOrder.customer) {
      updatedOrder.customer = {
        ...updatedOrder.customer.toJSON(),
        cs_birthDate: updatedOrder.customer.cs_birthDate
          ? new Date(updatedOrder.customer.cs_birthDate)
              .toISOString()
              .split("T")[0]
          : null,
      };
    }

    updatedOrder.ord_date = new Date(updatedOrder.ord_date)
      .toISOString()
      .split("T")[0];

    return successResponse(res, "Success update order", 200, {
      previousDataOrder,
      updatedOrder,
    });
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      attributes: {
        exclude: ["ord_createdAt", "ord_updatedAt"],
      },
    });

    if (!order) {
      return errorNotFoundResponse(res, "Order not found", 404);
    }

    await Order.destroy({
      where: {
        ord_id: id,
      },
    });

    return successResponse(res, "Success delete order", 200, order);
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

module.exports = {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
