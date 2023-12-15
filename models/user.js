const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      match: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 4,
    },

    goal: {
      type: String,
      enum: ["Lose Fat", "Maintain", "Gain Muscle"],
      required: [true, "Goal is required"],
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Gender is required"],
    },
    height: {
      type: Number,
      required: [true, "Height is required"],
    },

    weight: {
      type: Number,
      required: [true, "Weight is required"],
    },

    // token: {
    //   type: String,
    //   default: null,
    // },
    // avatarURL: {
    //   type: String,
    //   required: true,
    // },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   default: null,
    // },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

module.exports = model("user", userSchema);
