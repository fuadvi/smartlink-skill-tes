const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const validator = require("fastest-validator");
const v = new validator();
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRED } = process.env;

module.exports = async (req, res) => {
  // schema validasi
  const schema = {
    username: { type: "string", empty: false },
    password: { type: "string", empty: false },
  };

  // proess validation
  const validate = v.validate(req.body, schema);

  // cek apakah data valid
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  try {
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

    // kirim response
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
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
