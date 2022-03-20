module.exports = (sequelize, DataTypes) => {
  const Layanan = sequelize.define(
    "Layanan",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit: {
        type: DataTypes.ENUM,
        values: ["kg", "pcs", "cm", "m2"],
        allowNull: false,
      },
      harga: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "layanan",
      timestamps: true,
    }
  );

  return Layanan;
};
