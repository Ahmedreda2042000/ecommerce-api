const express = require("express");

const {
  getAllCategorys,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../services/categoryServices");
const AuthService = require("../services/authService");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");
const { images } = require("../services/images");
const subcategoriesRoute = require("./subCategoryRoutes");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);
router
  .route("/")
  .post(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  )
  .get(getAllCategorys);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;
