"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nama: "John Doe",
          username: "fuad",
          password: await bcrypt.hash("123456", 10),
          telepon: "081234567890",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nama: "John ika",
          username: "ika",
          password: await bcrypt.hash("123456", 10),
          telepon: "081234567890",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
