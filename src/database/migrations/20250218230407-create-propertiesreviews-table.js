'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('propertiesreviews', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      authorId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      propertyId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('propertiesreviews');
  }
};
