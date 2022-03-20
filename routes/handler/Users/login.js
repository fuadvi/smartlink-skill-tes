const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const validator = require("fastest-validator");
const v = new validator();
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRED } = process.env;

module.exports = async (req, res) => {
  const schema = {
    username: { type: "string", empty: false },
    password: { type: "string", empty: false },
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  //   mencari username
  const user = await User.findOne({ where: { username: req.body.username } });

  //   cek username tidak ada
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User Not Found",
    });
  }

  //   cek password hash
  const isvalidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  //   cek password salah
  if (!isvalidPassword) {
    return res.status(404).json({
      status: "error",
      message: "User Not Found",
    });
  }

  //   create token
  const token = jwt.sign({ user }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
  });

  return res.status(200).json({
    code: 200,
    status: "Success",
    data: {
      id: user.id,
      nama: user.nama,
      username: user.username,
      token,
    },
  });
};
