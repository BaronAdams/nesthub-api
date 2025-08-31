'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('comments', {
      fields: ['authorId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_comments_authorId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'users', // Table de référence
        field: 'id' // Clé primaire de la table chats
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('comments', {
      fields: ['postId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_comments_postId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'posts', // Table de référence
        field: 'id' // Clé primaire de la table Users
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('comments', 'fk_comments_authorId');
    await queryInterface.removeConstraint('comments', 'fk_comments_postId');
  }
};
