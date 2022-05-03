const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../models/user");
const {
  validateRegisterInput,
  validateLogin,
} = require("../../util/validators");

const genToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    register: async (
      p,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("User Input Not Valid", {
          errors: { ...errors },
        });
      }

      let user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username already taken", {
          errors: { username: "Username already taken" },
        });
      }

      user = await User.findOne({ email });

      if (user) {
        throw new UserInputError("email already registered", {
          errors: { email: "email already registered" },
        });
      }

      password = await hash(password, 12);

      const newUser = await User.create({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const token = genToken(newUser);

      return { ...newUser._doc, id: newUser.id, token };
    },
    login: async (p, { username, password }) => {
      const { valid, errors } = validateLogin(username, password);

      if (!valid) {
        if (errors.username) {
          throw new UserInputError(errors.username, {
            errors: { ...errors },
          });
        }
        if (errors.password) {
          throw new UserInputError(errors.password, {
            errors: { ...errors },
          });
        }
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.username = "Username does not exist";
        throw new UserInputError(errors.general, {
          errors: { ...errors },
        });
      } else {
        if (!(await compare(password, user.password))) {
          errors.password = "Password Incorrect";
          throw new UserInputError(errors.general, {
            errors: { ...errors },
          });
        }
      }

      const token = genToken(user);

      return { ...user._doc, id: user.id, token };
    },
  },
};
