const express = require("express");
const {
  create,
  get,
  getAll,
  deleteInv,
  update,
} = require("../controllers/InvoiceController");
const { requireSignIn } = require("./../middlewares/authMiddlewares");
const router = express.Router();
router.post("/create-invoice", requireSignIn, create);
router.get("/get-invoice/:slug", get);
router.get("/dashboard", requireSignIn, getAll);
router.delete("/delete-invoice/:id", requireSignIn, deleteInv);
router.put("/update-invoice/:slug", update);

module.exports = router;
