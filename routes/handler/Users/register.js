const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator({
  useNewCustomCheckerFunction: true,
});
module.exports = async (req, res) => {
  // schema validasi
  const schema = {
    nama: { type: "string", min: 1, max: 50, empty: false },
    username: {
      type: "string",
      min: 1,
      max: 255,
      custom: (v, errors) => {
        if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v))
          return errors.push({
            keyword: "custom",
            message: "Username tidak boleh mengandung simbol",
          });

        return v;
      },
      empty: false,
      messages: {
        stringPattern: "pass value must contain a digit",
        stringMin: "Your pass value is too short",
        stringMax: "Your pass value is too large",
      },
    },
    password: { type: "string", empty: false },
    telepon: { type: "string", min: 1, max: 15, empty: false, numeric: true },
  };

  const validate = v.validate(req.body, schema);
  //   jika validasi gagal
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  //   cek username sudah terdaftar atau belum
  if (user) {
    return res.status(409).json({
      status: "error",
      message: "Username sudah terdaftar",
    });
  }

  try {
    //   simpan data register ke database
    const user = await User.create({
      nama: req.body.nama,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      telepon: req.body.telepon,
    });

    //  kirim response
    return res.status(201).json({
      code: 200,
      status: "success",
      message: "berhasil terdaftar",
    });
  } catch (err) {
    //   jika proses register gagal maka kirim response error
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
