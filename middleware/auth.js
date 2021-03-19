const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.send("Token yoq");
  }
  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next()
  } catch (err) {
    return res.send("yaroqsiz token");
  }
}
