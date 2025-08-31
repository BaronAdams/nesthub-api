'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      property_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      hood: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      furnished: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      priceFrequency: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      sellerId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      area: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      stars: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      rooms: {
        type: Sequelize.JSONB,
        allowNull: true
      },

      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },

      likedBy: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
        defaultValue: [],
      },

      savedBy: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
        defaultValue: [],
      },

      createdAt:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
      },

      updatedAt:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('properties');
  }
};
