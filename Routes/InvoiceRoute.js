const express = require("express");
const {
  InvoiceController,
  getInvoiceController,
  getAllInvoicesController,
  deleteInvoiceController,
  updateInvoiceController,
} = require("../controllers/InvoiceController");
const router = express.Router();
router.post("/create-invoice", InvoiceController);
router.get("/get-invoice/:slug", getInvoiceController);
router.get("/dashboard", getAllInvoicesController);
router.delete("/delete-invoice/:id", deleteInvoiceController);
router.put("/update-invoice/:slug", updateInvoiceController);

module.exports = router;
