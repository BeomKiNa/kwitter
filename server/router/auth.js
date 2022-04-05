import express from "express";
import "express-async-error";
import { body } from "express-validator";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";
import validate from "../middleware/validator.js";

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("password should be at least 4 characters"),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("name").notEmpty().withMessage("name is missing"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
  body("url")
    .isURL()
    .withMessage("invalid URL")
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

const router = express.Router();

// POST /auth/signup
router.post("/signup", validateSignup, authController.signup);

// POST /auth/login
router.post("/login", validateCredential, authController.login);

// GET /auth/me
router.get("/me", isAuth, authController.me);
export default router;
