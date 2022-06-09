const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (authHeader.split(" ")[0] !== "Bearer") {
    return res.status(500).send({
      message: "Incorrect token format",
    });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
    const { TokenExpiredError } = jwt;
    if (err instanceof TokenExpiredError) {
      return res
        .status(401)
        .send({ message: "Unauthorized! Access Token was expired!" });
    }

    console.log(err);
    if (err) return res.sendStatus(401);
    req.user = data;

    next();
  });
};

module.exports = verifyToken;
