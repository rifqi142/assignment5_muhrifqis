const {
  successResponseCreatedData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
  errorNotFoundResponse,
} = require("../helpers/responseHelpers");

const { Customer, Contact } = require("../models");

// get all contact
const getAllContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contacts = await Contact.findAll({
      where: {
        cnt_cs_id: id,
      },
      attributes: {
        exclude: ["cnt_createdAt", "cnt_updatedAt"],
      },
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (!contacts || contacts.length === 0) {
      return errorNotFoundResponse(
        res,
        "No contacts found for this customer",
        404
      );
    }

    const formattedContacts = contacts.map((contact) => {
      const formattedCustomer = contact.customer
        ? {
            ...contact.customer.toJSON(),
            cs_birthDate: contact.customer.cs_birthDate
              ? new Date(contact.customer.cs_birthDate)
                  .toISOString()
                  .split("T")[0]
              : null,
          }
        : null;

      return {
        ...contact.toJSON(),
        customer: formattedCustomer,
      };
    });

    return successResponse(
      res,
      "Success get all contacts for customer",
      200,
      formattedContacts
    );
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// get contact by id
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id, {
      attributes: {
        exclude: ["cnt_createdAt", "cnt_updatedAt"],
      },
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (!contact) {
      return errorNotFoundResponse(res, "Contact not found", 404);
    }

    const formattedCustomer = contact.customer
      ? {
          ...contact.customer.toJSON(),
          cs_birthDate: contact.customer.cs_birthDate
            ? contact.customer.cs_birthDate.toISOString().split("T")[0]
            : null,
        }
      : null;

    const formattedContact = {
      ...contact.toJSON(),
      customer: formattedCustomer,
    };

    return successResponse(
      res,
      "Success get contact by id",
      200,
      formattedContact
    );
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// create contact
const createContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { cnt_phone, cnt_fax } = req.body;

    if (!cnt_phone || !cnt_fax) {
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

    const contact = await Contact.create({
      cnt_cs_id: id,
      cnt_phone,
      cnt_fax,
    });

    return successResponseCreatedData(
      res,
      "Success create contact",
      201,
      contact
    );
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { cnt_phone, cnt_fax } = req.body;

    if (!cnt_phone || !cnt_fax) {
      return errorClientResponse(res, "All fields must be filled", 400);
    }

    const contact = await Contact.findByPk(id, {
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (!contact) {
      return errorNotFoundResponse(res, "Contact not found", 404);
    }

    const previousDataContact = { ...contact.dataValues };

    if (previousDataContact.customer) {
      previousDataContact.customer = {
        ...previousDataContact.customer.toJSON(),
        cs_birthDate: previousDataContact.customer.cs_birthDate
          ? new Date(previousDataContact.customer.cs_birthDate)
              .toISOString()
              .split("T")[0]
          : null,
      };
    }

    delete previousDataContact.cnt_createdAt;
    delete previousDataContact.cnt_updatedAt;

    await Contact.update({ cnt_phone, cnt_fax }, { where: { cnt_id: id } });

    const updatedContact = await Contact.findByPk(id, {
      attributes: {
        exclude: ["cnt_createdAt", "cnt_updatedAt"],
      },
      include: {
        model: Customer,
        as: "customer",
        attributes: {
          exclude: ["cs_is_active", "cs_createdAt", "cs_updatedAt"],
        },
      },
    });

    if (updatedContact.customer) {
      updatedContact.customer = {
        ...updatedContact.customer.toJSON(),
        cs_birthDate: updatedContact.customer.cs_birthDate
          ? new Date(updatedContact.customer.cs_birthDate)
              .toISOString()
              .split("T")[0]
          : null,
      };
    }

    return successResponse(res, "Success update contact", 200, {
      previousDataContact,
      updatedContact,
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    return errorServerResponse(res, "Internal server error", 500);
  }
};

// delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id, {
      attributes: {
        exclude: ["cnt_createdAt", "cnt_updatedAt"],
      },
    });

    if (!contact) {
      return errorNotFoundResponse(res, "Contact not found", 404);
    }

    await Contact.destroy({
      where: {
        cnt_id: id,
      },
    });

    return successResponse(res, "Success delete contact", 200, contact);
  } catch (error) {
    return errorServerResponse(res, "Internal server error", 500);
  }
};

module.exports = {
  getAllContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
