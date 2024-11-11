const {
  successResponseCreatedData,
  successResponse,
  successDeleteResponse,
  errorServerResponse,
  errorClientResponse,
  errorNotFoundResponse,
  errorConflictResponse,
} = require("../helpers/responseHelpers");
const { Customer, Address, Contact, Order } = require("../models");

// get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: {
        exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
      },
      include: [
        {
          model: Address,
          as: "addresses",
          attributes: {
            exclude: ["adrs_createdAt", "adrs_updatedAt"],
          },
        },
        {
          model: Contact,
          as: "contacts",
          attributes: {
            exclude: ["cnt_createdAt", "cnt_updatedAt"],
          },
        },
        {
          model: Order,
          as: "orders",
          attributes: {
            exclude: ["ord_createdAt", "ord_updatedAt"],
          },
        },
      ],
      order: [["cs_id", "ASC"]],
    });

    if (!customers || customers.length === 0) {
      return errorNotFoundResponse(res, "Customers not found", 404);
    }

    const formattedCustomers = customers.map((customer) => {
      return {
        ...customer.toJSON(),
        cs_birthDate: customer.cs_birthDate
          ? customer.cs_birthDate.toISOString().split("T")[0]
          : null,
      };
    });

    return successResponse(
      res,
      "Success get all customers",
      200,
      formattedCustomers
    );
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// get customer by id
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, {
      attributes: {
        exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
      },
      include: [
        {
          model: Address,
          as: "addresses",
          attributes: {
            exclude: ["adrs_createdAt", "adrs_updatedAt"],
          },
        },
        {
          model: Contact,
          as: "contacts",
          attributes: {
            exclude: ["cnt_createdAt", "cnt_updatedAt"],
          },
        },
        {
          model: Order,
          as: "orders",
          attributes: {
            exclude: ["ord_createdAt", "ord_updatedAt"],
          },
        },
      ],
      order: [["cs_id", "ASC"]],
    });

    if (!customer) {
      return errorNotFoundResponse(res, "Customer not found", 404);
    }

    const formattedCustomer = {
      ...customer.toJSON(),
      cs_birthDate: customer.cs_birthDate
        ? customer.cs_birthDate.toISOString().split("T")[0]
        : null,
    };

    return successResponse(
      res,
      "Success get customer by id",
      200,
      formattedCustomer
    );
  } catch (error) {
    console.log(error);
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// create a new customer
const createCustomer = async (req, res) => {
  try {
    const { cs_fullName, cs_email, cs_gender, cs_birthDate } = req.body;

    if (!cs_fullName || !cs_email || !cs_gender || !cs_birthDate) {
      return errorClientResponse(res, "All fields are required", 400);
    }

    if (cs_email) {
      const customer = await Customer.findOne({
        where: {
          cs_email,
        },
      });
      if (customer) {
        return errorConflictResponse(res, "Email already exists", 409);
      }
    }

    const newCustomer = await Customer.create({
      cs_fullName,
      cs_email,
      cs_gender,
      cs_birthDate,
    });

    const formattedBirthDate = newCustomer.cs_birthDate
      .toISOString()
      .split("T")[0];

    const responseData = {
      cs_id: newCustomer.cs_id,
      cs_fullName: newCustomer.cs_fullName,
      cs_email: newCustomer.cs_email,
      cs_gender: newCustomer.cs_gender,
      cs_birthDate: formattedBirthDate,
    };

    return successResponseCreatedData(
      res,
      "Customer created",
      201,
      responseData
    );
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// update a customer data
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    let { cs_fullName, cs_email, cs_gender, cs_birthDate } = req.body;

    if (!cs_fullName || !cs_email || !cs_gender || !cs_birthDate) {
      return errorClientResponse(res, "All fields are required", 400);
    }

    if (cs_birthDate) {
      cs_birthDate = new Date(cs_birthDate).toISOString().split("T")[0];
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return errorNotFoundResponse(res, "Customer not found", 404);
    }

    const previousDataCustomer = { ...customer.dataValues };

    delete previousDataCustomer.cs_createdAt;
    delete previousDataCustomer.cs_updatedAt;
    delete previousDataCustomer.cs_is_active;

    if (previousDataCustomer.cs_birthDate) {
      previousDataCustomer.cs_birthDate = previousDataCustomer.cs_birthDate
        .toISOString()
        .split("T")[0];
    }

    await Customer.update(
      {
        cs_fullName,
        cs_email,
        cs_gender,
        cs_birthDate,
      },
      {
        where: {
          cs_id: id,
        },
      }
    );

    const updatedCustomer = await Customer.findByPk(id, {
      attributes: { exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"] },
    });

    // format date update
    updatedCustomer.cs_birthDate = updatedCustomer.cs_birthDate
      .toISOString()
      .split("T")[0];

    return successResponse(res, "Customer updated", 200, {
      previousDataCustomer,
      updatedCustomer,
    });
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// delete a customer
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return errorNotFoundResponse(res, "Customer not found", 404);
    }

    await Customer.destroy({
      where: {
        cs_id: id,
      },
    });

    return successDeleteResponse(res, "Customer deleted successfully", 204);
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
