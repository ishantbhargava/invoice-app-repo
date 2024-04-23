const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/DB");
const AuthRoute = require("./Routes/AuthRoute");
const InvoiceRoute = require("./Routes/InvoiceRoute");
const path = require("path");
dotenv.config();

connectDB();
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "frontend", "build")));

app.use("/api/v1/auth/", AuthRoute);
app.use("/api/v1/invoice/", InvoiceRoute);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
