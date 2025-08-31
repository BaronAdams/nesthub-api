'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('chatmessages', {
      fields: ['chatId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_chatmessages_chatId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'chats', // Table de référence
        field: 'id' // Clé primaire de la table chats
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('chatmessages', {
      fields: ['senderId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_chatmessages_senderId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'users', // Table de référence
        field: 'id' // Clé primaire de la table Users
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('chatmessages', 'fk_chatmessages_chatId');
    await queryInterface.removeConstraint('chatmessages', 'fk_chatmessages_senderId');
  }
};
