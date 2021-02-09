const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail)
      return res.status(400).send({
        message: "Email Already Registered",
      });

    const hashedStrength = 10;
    const hashedPassword = await bcrypt.hash(password, hashedStrength);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      message: "Register Success",
      data: {
        user: {
          email,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user)
      return res.status(400).send({
        message: "Your Credentials is not valid",
      });

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return res.status(400).send({
        message: "Your Credentials is not valid",
      });

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      message: "Login Success",
      data: {
        user: {
          email,
          fullName: user.fullName,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    res.send({
      status: "success",
      message: "User Valid",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
