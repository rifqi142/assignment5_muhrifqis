const {
  successResponseCreatedData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
  errorNotFoundResponse,
} = require("../helpers/responseHelpers");

const { Customer, Address } = require("../models");

// get all address
const getAllAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const addresses = await Address.findAll({
      where: {
        adrs_cs_id: id,
      },
      attributes: {
        exclude: ["adrs_createdAt", "adrs_updatedAt"],
      },
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: {
            exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
          },
        },
      ],
    });

    if (!addresses || addresses.length === 0) {
      return errorNotFoundResponse(
        res,
        "No addresses found for this customer",
        404
      );
    }

    const formattedAddresses = addresses.map((address) => {
      const formattedCustomer = address.customer
        ? {
            ...address.customer.toJSON(),
            cs_birthDate: address.customer.cs_birthDate
              ? new Date(address.customer.cs_birthDate)
                  .toISOString()
                  .split("T")[0]
              : null,
          }
        : null;

      return {
        ...address.toJSON(),
        customer: formattedCustomer,
      };
    });

    return successResponse(
      res,
      "Success get all addresses for customer",
      200,
      formattedAddresses
    );
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// get address by id
const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByPk(id, {
      attributes: {
        exclude: ["adrs_createdAt", "adrs_updatedAt"],
      },
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (!address) {
      return errorNotFoundResponse(res, "Address not found", 404);
    }

    const formattedAddress = {
      ...address.toJSON(),
      customer: address.customer
        ? {
            ...address.customer.toJSON(),
            cs_birthDate: address.customer.cs_birthDate
              ? address.customer.cs_birthDate.toISOString().split("T")[0]
              : null,
          }
        : null,
    };

    return successResponse(
      res,
      "Success get address by id",
      200,
      formattedAddress
    );
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// create address
const createAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { adrs_street, adrs_city, adrs_state, adrs_postalCode } = req.body;

    if (!adrs_street || !adrs_city || !adrs_state || !adrs_postalCode) {
      return errorClientResponse(res, "All fields must be filled", 400);
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return errorNotFoundResponse(res, "Customer not found", 404);
    }

    const address = await Address.create({
      adrs_cs_id: id,
      adrs_street,
      adrs_city,
      adrs_state,
      adrs_postalCode,
    });

    const createdAddress = await Address.findByPk(address.adrs_id, {
      attributes: { exclude: ["adrs_createdAt", "adrs_updatedAt"] },
    });

    return successResponseCreatedData(
      res,
      "Success create address",
      201,
      createdAddress
    );
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// update address
const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { adrs_street, adrs_city, adrs_state, adrs_postalCode } = req.body;

    if (!adrs_street || !adrs_city || !adrs_state || !adrs_postalCode) {
      return errorClientResponse(res, "All fields must be filled", 400);
    }

    const address = await Address.findByPk(id, {
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (!address) {
      return errorNotFoundResponse(res, "Address not found", 404);
    }

    const previousDataAddress = { ...address.dataValues };
    if (previousDataAddress.customer) {
      previousDataAddress.customer = {
        ...previousDataAddress.customer.toJSON(),
        cs_birthDate: previousDataAddress.customer.cs_birthDate
          ? new Date(previousDataAddress.customer.cs_birthDate)
              .toISOString()
              .split("T")[0]
          : null,
      };
    }

    delete previousDataAddress.adrs_createdAt;
    delete previousDataAddress.adrs_updatedAt;

    await Address.update(
      {
        adrs_street,
        adrs_city,
        adrs_state,
        adrs_postalCode,
      },
      {
        where: { adrs_id: id },
      }
    );

    const updatedDataAddress = await Address.findByPk(id, {
      attributes: { exclude: ["adrs_createdAt", "adrs_updatedAt"] },
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (updatedDataAddress.customer) {
      updatedDataAddress.customer = {
        ...updatedDataAddress.customer.toJSON(),
        cs_birthDate: updatedDataAddress.customer.cs_birthDate
          ? new Date(updatedDataAddress.customer.cs_birthDate)
              .toISOString()
              .split("T")[0]
          : null,
      };
    }

    return successResponse(res, "Success update address", 200, {
      previousDataAddress,
      updatedDataAddress,
    });
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// delete address
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findByPk(id, {
      attributes: { exclude: ["adrs_createdAt", "adrs_updatedAt"] },
    });

    if (!address) {
      return errorNotFoundResponse(res, "Address not found", 404);
    }

    await Address.destroy({
      where: {
        adrs_id: id,
      },
    });

    return successResponse(res, "Success delete address", 200, address);
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

module.exports = {
  getAllAddress,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
};
