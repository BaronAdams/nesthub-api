'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('blacklistedtokens', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('blacklistedtokens');
  }
};
