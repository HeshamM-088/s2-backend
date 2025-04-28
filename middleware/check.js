const check = async (req, res, next) => {
  const token = req.headers["authorization"] || req.headers["Authorization"];

  if (token.split(" ")[1] == 9999) {
    return next();
  }

  return res.status(401).json("invalid");
};

module.exports = {
  check,
};
