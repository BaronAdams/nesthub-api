'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('posts', {
      fields: ['adminId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_posts_adminId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'admins', // Table de référence
        field: 'id' // Clé primaire de la table chats
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('posts', 'fk_posts_adminId');
  }
};
