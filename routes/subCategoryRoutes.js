// const express = require("express");
// const {
//   createSubCategory,
//   getAllSubCategory,
//   getSubCategory,
//   updateSubCategory,
//   deleteSubCategory,
//   createFilterObj,
//   setCategoryIdToBody,
// } = require("../services/subCategory");

// const {
//   deleteSubcategoryValidator,
//   updateSubcategoryValidator,
//   createSubcategoryValidator,
//   getSubcategoryValidator,
// } = require("../utils/validators/subCategoryValidator");
// const router = express.Router({ mergeParams: true });

// router
//   .route("/")
//   .post(setCategoryIdToBody, createSubcategoryValidator, createSubCategory)
//   .get(createFilterObj, getAllSubCategory);
// router
//   .route("/:id")
//   .get(getSubcategoryValidator, getSubCategory)
//   .put(updateSubcategoryValidator, updateSubCategory)
//   .delete(deleteSubcategoryValidator, deleteSubCategory);

// module.exports = router;

const express = require("express");
const authService = require("../services/authService");
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../services/subCategory");
const {
  deleteSubcategoryValidator,
  updateSubcategoryValidator,
  createSubcategoryValidator,
  getSubcategoryValidator,
} = require("../utils/validators/subCategoryValidator");

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    setCategoryIdToBody,
    createSubcategoryValidator,
    createSubCategory
  )
  .get(createFilterObj, getSubCategories);
router
  .route("/:id")
  .get(getSubcategoryValidator, getSubCategory)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    updateSubcategoryValidator,
    updateSubCategory
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteSubcategoryValidator,
    deleteSubCategory
  );

module.exports = router;
