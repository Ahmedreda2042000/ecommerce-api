const express = require("express");
const router = express.Router();
const {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../services/brandServices");
const authService = require("../services/authService");

const {
  createBrandValidator,
  getBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} = require("../utils/validators/brandValidator");
const { images } = require("../services/images");

router
  .route("/")
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  )
  .get(getAllBrands);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    updateBrandValidator,
    updateBrand
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;
