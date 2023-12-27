const Category = require("../models/categoryModel");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

// Upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/categories/${filename}`);

  // Save image into our db
  req.body.image = filename;

  next();
});
// @desc    get categorys
// @route   get  /api/v1/categories
// @access  Public

exports.getAllCategorys = factory.getAll(Category);
// @desc    get category
// @route   get  /api/v1/categories:id
// @access  Public

exports.getCategory = factory.getOne(Category);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(Category);

//@desc update category
//@route update /api/v1/categories
// @access  Private

exports.updateCategory = factory.updateOne(Category);

//@desc delete category
//@route delete /api/v1/categories
// @access  Private

exports.deleteCategory = factory.deleteOne(Category);
