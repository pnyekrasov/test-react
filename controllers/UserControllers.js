const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { JWT_SECRET } = process.env;

const User = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

class UserController {
  register = ctrlWrapper(async (req, res) => {
    const { email, password } = req.body;

    const result = await User.findOne({ email }).exec();
    if (result) {
      throw HttpError(409, `Email ${email} in use`);
    }
    if (!email || !password) {
      throw HttpError(400);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

    res.status(201).send({
      code: 201,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  });

  // login = ctrlWrapper(async (req, res) => {
  //   const { email, password } = req.body;

  //   const user = await User.findOne({ email }).exec();
  //   if (!user) {
  //     throw HttpError(401, "Email or password is wrong");
  //   }

  //   const passwordCompare = await bcrypt.compare(password, user.password);
  //   if (!passwordCompare) {
  //     throw HttpError(401, "Email or password is wrong");
  //   }

  //   const payload = { id: user._id };
  //   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "500h" });

  //   await User.findByIdAndUpdate(user._id, { token });
  //   const { subscription } = user;
  //   res.status(200).send({ code: 200, token, user: { email, subscription } });
  // });

  // getCurrent = ctrlWrapper(async (req, res) => {
  //   const { email, subscription } = req.user;
  //   res.status(200).send({ code: 200, email, subscription });
  // });

  // logout = ctrlWrapper(async (req, res) => {
  //   await User.findByIdAndUpdate(req.user.id, { token: null });

  //   res.status(204).send({ message: "No Content" });
  // });

  // changeSubscription = ctrlWrapper(async (req, res) => {
  //   const validSubscription = ["starter", "pro", "business"];
  //   if (!validSubscription.includes(req.body.subscription)) {
  //     throw HttpError(400);
  //   }

  //   const user = await User.findByIdAndUpdate(req.user.id, req.body, {
  //     new: true,
  //   }).exec();
  //   if (!user) {
  //     throw HttpError(404);
  //   }

  //   const { email, subscription } = req.user;
  //   res.status(200).send({ code: 200, code: 200, email, subscription });
  // });
}

module.exports = new UserController();
