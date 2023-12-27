const express = require("express");
const app = express();
var path = require("path");
const categoryRouter = require("./routes/categoryRoute");
const subCategoryRouter = require("./routes/subCategoryRoutes");
const brandRoute = require("./routes/brandRoutes");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");

const dbConnection = require("./config/db");

dbConnection();

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

/// user router middleware
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subCategoryRouter);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/orders", orderRoute);

app.listen(3000, () => {
  console.log(`App running running on port 3000`);
});
