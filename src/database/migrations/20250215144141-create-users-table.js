'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      languages: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      scores: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {
          property_type: {},
          userId: {},
          hood: {},
          city: {},
        }
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["buyer", "seller", "both", "admin"],
        allowNull: false,
        defaultValue: 'both'
      },
      isOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lastSeen: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      profilePic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stars: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastLoginDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastSessionDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};

