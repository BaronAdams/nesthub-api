'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chats', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      buyerId:{
        type: Sequelize.UUID,
        allowNull:false
      },
      sellerId:{
        type: Sequelize.UUID,
        allowNull:false
      },
      propertyId:{
        type: Sequelize.UUID,
        allowNull:true
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
    await queryInterface.dropTable('chats');
  }
};
