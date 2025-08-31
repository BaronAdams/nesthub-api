'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('propertiesreviews', {
      fields: ['authorId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_propertiesreviews_authorId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'users', // Table de référence
        field: 'id' // Clé primaire de la table chats
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('propertiesreviews', {
      fields: ['propertyId'], // La colonne qui doit être une clé étrangère
      type: 'foreign key',
      name: 'fk_propertiesreviews_propertyId', // Nom de la contrainte (utile pour la suppression)
      references: {
        table: 'properties', // Table de référence
        field: 'id' // Clé primaire de la table Users
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('propertiesreviews', 'fk_propertiesreviews_authorId');
    await queryInterface.removeConstraint('propertiesreviews', 'fk_propertiesreviews_propertyId');
  }
};
