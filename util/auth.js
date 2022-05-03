const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

module.exports = (context) => {
  const authHeader = context.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        return user;
      } catch (error) {
        throw new AuthenticationError(
          "No Authorization, Invalid/Expired Token"
        );
      }
    }
    throw new AuthenticationError("No Authorization, Must be a Bearer Token");
  }
  throw new AuthenticationError("No Authorization, No Token Provided");
};
