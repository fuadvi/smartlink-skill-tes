const { Layanan } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();

module.exports = async (req, res) => {
  // schema validasi
  const schema = {
    nama: { type: "string", max: 50, empty: false },
    unit: { type: "enum", values: ["kg", "pcs", "cm", "m2"], empty: false },
    harga: { type: "string", empty: false },
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
    const id = req.user.user.id;

    const harga = req.body.harga.replaceAll(".", "").replaceAll(",", ".");
    const layanan = await Layanan.create({
      nama: req.body.nama,
      unit: req.body.unit,
      harga: harga,
      userId: id,
    });

    return res.status(200).json({
      code: 200,
      status: "success",
      data: {
        id: layanan.id,
        nama: layanan.nama,
        unit: layanan.unit,
        harga: layanan.harga,
        user_id: layanan.userId,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
