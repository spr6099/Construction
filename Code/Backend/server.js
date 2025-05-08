const express = require("express");
require("dotenv").config();
const connectDB = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRouter = require("./routers/auth.router");
const adminRouter = require("./routers/admin.router");
const labourRouter = require("./routers/labour.router");
const consulRouter = require("./routers/consultancy.router");
const userRouter = require("./routers/client.router");
const contractorRouter = require("./routers/contractor.router");
const supplierRouter = require("./routers/supplier.router");

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/labour", labourRouter);
app.use("/consultancy", consulRouter);
app.use("/client", userRouter);
app.use("/contractor", contractorRouter);
app.use("/supplier", supplierRouter);

app.listen(PORT, () => {
  console.log("connected");
});
