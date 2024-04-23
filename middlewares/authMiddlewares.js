const JWT = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.header.authorization, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized :  Invalid token" });
  }
};
module.exports = { requireSignIn };
