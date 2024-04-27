const InvoiceModel = require("./../models/InvoiceModel");
const slugify = require("slugify");

const InvoiceController = async (req, res) => {
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

    // const invoiceProducts = products.map((product) => ({
    //   productName: product.productName,
    //   price: product.price,
    //   quantity: product.quantity,
    // }));

    const invoice = await new InvoiceModel({
      currentDate,
      products,
      price,
      quantity,
      companyName,
      companyAddress,
      companyEmail,
      createdBy: req.user._id,
      slug: slugify(companyName),
    }).save();
    res.status(200).send({
      success: "true",
      message: "your invoice created",
      invoice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "somthing went wrong",
      error,
    });
  }
};

const getInvoiceController = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findOne({
      slug: req.params.slug,
    });
    res.status(200).send({
      success: true,
      message: "got all values",
      invoice,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "err while getting all values",
    });
  }
};
const getAllInvoicesController = async (req, res) => {
  try {
    const invoices = await InvoiceModel.find({ createdBy: req.user._id });
    res.status(200).json({
      success: true,
      message: "got all values",
      invoices,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "err while getting all values",
    });
  }
};

const deleteInvoiceController = async (req, res) => {
  try {
    await InvoiceModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "invoice deleted successFully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in deleting invoice",
    });
  }
};
const updateInvoiceController = async (req, res) => {
  try {
    const { companyAddress, companyEmail, companyName, products } = req.body;

    const invoice = await InvoiceModel.findOne({ slug: req.params.slug });
    invoice.products = products;
    invoice.companyName = companyName;
    invoice.slug = slugify(companyName);
    invoice.companyEmail = companyEmail;
    invoice.companyAddress = companyAddress;
    await invoice.save();

    res.status(201).send({
      success: true,
      message: "invoices updated successfully",
      invoice,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      error,
      message: "Error in updating invoices",
    });
  }
};

module.exports = {
  InvoiceController,
  getInvoiceController,
  deleteInvoiceController,
  getAllInvoicesController,
  updateInvoiceController,
};
