'use strict';

const {
  sequelize
} = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(50)
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('laki-laki', 'perempuan')
      },
      password: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('admin', 'buyer', 'seller')
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        devaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        devaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};