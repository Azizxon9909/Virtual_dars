module.exports = function (req, res, next) {
  if ((!req.user.isAdmin)) {
    return res.send("Murojat rad etildi");
  }
  next();
};
