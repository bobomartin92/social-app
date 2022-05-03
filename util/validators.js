module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username can not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email can not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) {
      errors.email = "Email Not Valid";
    }
  }

  if (password === "") {
    errors.password = "Password cannot be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password do not match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLogin = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username can not be empty";
  }
  if (password === "") {
    errors.password = "Password can not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
