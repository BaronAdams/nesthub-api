'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      adminId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      coverPic: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('posts');
     
  }
};
