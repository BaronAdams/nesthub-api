'use strict';
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10)
  return await bcrypt.hash(password, salt)
}

const generateColor = () =>{
  let profilePallete = [
      "#3f6212",
      "#3b82f6",
      "#ea580c",
      "#ef4444", 
      "#9333ea",
      "#ec4899"
  ]
  return profilePallete[crypto.randomInt(0, profilePallete.length - 1)]
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Douala",
        phone: "657230933",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Chris",
        lastName: "Porter",
        email: "chrisporter@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Bertoua",
        phone: "615528743",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Zachary",
        lastName: "Chambers",
        email: "zacharychambers@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Maroua",
        phone: "638989286",
        role: "buyer",
        color: generateColor()
      },
      {
        firstName: "Floyd",
        lastName: "Powell",
        email: "floydpowell@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Garoua",
        phone: "613929675",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Roxie",
        lastName: "Evans",
        email: "roxievans@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Ebolowa",
        phone: "638721581",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Louis",
        lastName: "Cobb",
        email: "louiscobb@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Yaoundé",
        phone: "680178240",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Ora",
        lastName: "Ingrame",
        email: "oraingrame@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Ebolowa",
        phone: "610154700",
        role: "buyer",
        color: generateColor()
      },
      {
        firstName: "Stephen",
        lastName: "Wong",
        email: "stephenwong@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Ngaoundéré",
        phone: "628128849",
        role: "buyer",
        color: generateColor()
      },
      {
        firstName: "Viola",
        lastName: "Baldwin",
        email: "violabaldwin@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Bamenda",
        phone: "642515716",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Bernice",
        lastName: "Lowe",
        email: "bernicelowe@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Maroua",
        phone: "626420797",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Troy",
        lastName: "Day",
        email: "troyday@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Yaoundé",
        phone: "644277140",
        role: "both",
        color: generateColor()
      },
      {
        firstName: "Adrian",
        lastName: "Black",
        email: "adrianblack@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Garoua",
        phone: "616806577",
        role: "buyer",
        color: generateColor()
      },
      {
        firstName: "Raymond",
        lastName: "Johnson",
        email: "raymondjohnson@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Garoua",
        phone: "622757933",
        role: "buyer",
        color: generateColor()
      },
      {
        firstName: "Stella",
        lastName: "Morales",
        email: "stellamorales@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Garoua",
        phone: "646530419",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Bradley",
        lastName: "Riley",
        email: "bradleyriley@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Garoua",
        phone: "642347540",
        role: "both",
        color: generateColor()
      },
      {
        firstName: "Alejandro",
        lastName: "Garner",
        email: "alejandrogarner@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Garoua",
        phone: "610052532",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Betty",
        lastName: "Davis",
        email: "bettydavis@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Ebolowa",
        phone: "672544345",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Harriett",
        lastName: "Jordan",
        email: "harrietthordan@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Yaoundé",
        phone: "606526094",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Dominic",
        lastName: "Mullins",
        email: "dominicmullins@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Maroua",
        phone: "697182514",
        role: "both",
        color: generateColor()
      },
      {
        firstName: "Agnes",
        lastName: "Richardson",
        email: "agnesrichardson@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Bafoussam",
        phone: "646035805",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Franklin",
        lastName: "Powell",
        email: "franklinpowell@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Ebolowa",
        phone: "616281538",
        role: "seller",
        color: generateColor()
      },
      {
        firstName: "Isaac",
        lastName: "Pratt",
        email: "isaacpratt@gmail.com",
        password: await hashPassword("S3Cret!"),
        location: "Ebolowa",
        phone: "655817211",
        role: "both",
        color: generateColor()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
