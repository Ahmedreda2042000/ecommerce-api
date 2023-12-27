const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getOrderValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
exports.createOrderValidator = [
  check("user").isMongoId().notEmpty().withMessage(" login user required"),
  check("product")
    .isMongoId()
    .isArray()
    .notEmpty()
    .withMessage(" login user required"),
  check("quantity").optional(),

  validatorMiddleware,
];

// exports.updateCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid category id format"),
//   body("name")
//     .optional()
//     .custom((val, { req }) => {
//       req.body.slug = slugify(val);
//       return true;
//     }),
//   validatorMiddleware,
// ];

// exports.deleteCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid category id format"),
//   validatorMiddleware,
// ];
