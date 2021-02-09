const jwt = require("jsonwebtoken");

//Dummy authenticated middleware
exports.authenticated = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(400).send({
      message: "Access Denied",
    });

  try {
    const secretKey = process.env.SECRET_KEY;
    const verified = jwt.verify(token, secretKey);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};
