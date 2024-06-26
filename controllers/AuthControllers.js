const UserModel = require("../models/UserModel");
const { hashPassword } = require("../helper/AuthHelper");
const { comparePassword } = require("../helper/AuthHelper");
const JWT = require("jsonwebtoken");
const InvoiceModel = require("../models/InvoiceModel");
//signupcontroller
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "email is already registered please login",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await new UserModel({
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,

      message: "err in registration",
    });
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(502).send({
        success: false,
        message: "invalid email or password",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(502).send({
        success: false,
        message: "email  is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(502).send({
        success: false,
        message: "invalid password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        email: user.email,
        password: user.password,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
    });
  }
};

const forget = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    //user;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email ",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = {
  signup,
  signIn,
  forget,
};
