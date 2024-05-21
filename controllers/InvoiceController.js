const InvoiceModel = require("./../models/InvoiceModel");
const slugify = require("slugify");

const create = async (req, res) => {
  try {
    const {
      currentDate,
      products,
      price,
      quantity,
      companyName,
      companyAddress,
      companyEmail,
    } = req.body;

    const newSlug = slugify(companyName, { lower: true });
    const invoice = new InvoiceModel({
      currentDate,
      products,
      price,
      quantity,
      companyName,
      companyAddress,
      companyEmail,
      createdBy: req.user._id,
      slug: newSlug,
    });

    await invoice.save();
    res.status(200).send({
      success: true,
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const get = async (req, res) => {
  try {
    const { slug } = req.params;
    const invoice = await InvoiceModel.findOne({ slug });
    if (!invoice) {
      return res.status(404).send({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Invoice retrieved successfully",
      invoice
    });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).send({
      success: false,
      message: "Error while fetching the invoice",

    });
  }
};

const getAll = async (req, res) => {
  try {
    const invoices = await InvoiceModel.find({ createdBy: req.user._id });
    res.status(200).json({
      success: true,
      message: "Invoices retrieved successfully",
      invoices,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching invoices",
    });
  }
};

const deleteInv = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await InvoiceModel.findByIdAndDelete(id);

    if (!invoice) {
      return res.status(404).send({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).send({
      success: false,
      message: "Error in deleting invoice",
    });
  }
};

const update = async (req, res) => {
  try {
    const { slug } = req.params;
    const { companyAddress, companyEmail, companyName, products } = req.body;

    const invoice = await InvoiceModel.findOne({ slug });

    if (!invoice) {
      return res.status(404).send({
        success: false,
        message: "Invoice not found",
      });
    }

    invoice.products = products;
    invoice.companyName = companyName;
    invoice.slug = slugify(companyName, { lower: true });
    invoice.companyEmail = companyEmail;
    invoice.companyAddress = companyAddress;

    await invoice.save();

    res.status(200).send({
      success: true,
      message: "Invoice updated successfully",
      invoice,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).send({
      success: false,
      message: "Error in updating invoice",
    });
  }
};

module.exports = {
  create,
  get,
  getAll,
  deleteInv,
  update,
};
