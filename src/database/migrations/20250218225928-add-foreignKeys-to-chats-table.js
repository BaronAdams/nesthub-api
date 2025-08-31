'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('chats', {
      fields: ['buyerId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_chats_buyerId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'users', // Table de référence
        field: 'id' // Clé primaire de la table Users
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('chats', {
      fields: ['sellerId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_chats_sellerId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'users', // Table de référence
        field: 'id' // Clé primaire de la table Users
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('chats', {
      fields: ['propertyId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_chats_propertyId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'properties', // Table de référence
        field: 'id' // Clé primaire de la table Users
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('chats', 'fk_chats_buyerId');
    await queryInterface.removeConstraint('chats', 'fk_chats_sellerId');
    await queryInterface.removeConstraint('chats', 'fk_chats_propertyId');
  }
};
