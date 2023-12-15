const Joi = require("joi");

const userJoiSchema = Joi.object({
  name: Joi.string()
    .required("Set name for user")
    .pattern(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),

  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/)
    .required("Set email for user"),

  password: Joi.string().min(4).required("Set password for contact"),

  goal: Joi.string()
    .valid("Lose Fat", "Maintain", "Gain Muscle")
    .required("Set goal for user"),

  gender: Joi.string()
  .valid("Male", "Female")
  .required("Set gender for user"),

  height: Joi.number()
  .required("Set height for user"),

  weight: Joi.number()
  .required("Set weight for user"),

  // token: Joi.string().default(null),
});

// const emailSchema = Joi.object({
//   email: Joi.string()
//     .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/)
//     .required("Set email for user"),
// });

module.exports = {
  userJoiSchema,
  // emailSchema,
};
