'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chatmessages', { 
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()'),
          primaryKey: true,
        },
        message: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        senderId: {
            type: Sequelize.UUID,
            allowNull: false,
            validate: {
                isUUID: 4
            }
        },
        chatId: {
            type: Sequelize.UUID,
            allowNull: false,
            validate: {
                isUUID: 4
            }
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
    await queryInterface.dropTable('chatmessages');
  }
};
