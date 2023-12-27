const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

// Upload single image
exports.uploadBrandImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  // Save image into our db
  req.body.image = filename;

  next();
});
// @desc    get brand
// @route   get  /api/v1/brand
// @access  Public

exports.getAllBrands = factory.getAll(Brand);
// @desc    get brand
// @route   get  /api/v1/brand:id
// @access  Public

exports.getBrand = factory.getOne(Brand);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createBrand = factory.createOne(Brand);

//@desc update brand
//@route update /api/v1/brand
// @access  Private

exports.updateBrand = factory.updateOne(Brand);

//@desc delete brand
//@route delete /api/v1/brand
// @access  Private

exports.deleteBrand = factory.deleteOne(Brand);
