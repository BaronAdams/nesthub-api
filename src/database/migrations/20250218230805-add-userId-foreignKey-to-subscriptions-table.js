'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('subscriptions', {
      fields: ['userId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_subscriptions_userId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'users', // Table de référence
        field: 'id' // Clé primaire de la table chats
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('subscriptions', 'fk_subscriptions_userId');
  }
};
