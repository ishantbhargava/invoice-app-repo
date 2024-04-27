const express = require("express");
const {
  InvoiceController,
  getInvoiceController,
  getAllInvoicesController,
  deleteInvoiceController,
  updateInvoiceController,
} = require("../controllers/InvoiceController");
const { requireSignIn } = require("./../middlewares/authMiddlewares");
const router = express.Router();
router.post("/create-invoice", requireSignIn, InvoiceController);
router.get("/get-invoice/:slug", requireSignIn, getInvoiceController);
router.get("/dashboard", requireSignIn, getAllInvoicesController);
router.delete("/delete-invoice/:id", requireSignIn, deleteInvoiceController);
router.put("/update-invoice/:slug", requireSignIn, updateInvoiceController);

module.exports = router;
