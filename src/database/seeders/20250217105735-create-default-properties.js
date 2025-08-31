'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('properties', [
      {
        createdAt: new Date("2024-07-25T10:18:37+01:00"),
        updatedAt: new Date(),
        title: "Studio moderne au cœur de la ville",
        sellerId: "c1a0afd2-a42d-4be4-91f2-67c210fdd087",
        hood: "Carrefour Menoua",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=1.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Un studio équipé avec des finitions modernes, idéal pour un étudiant ou un jeune professionnel.",
        property_type: "Studio",
        furnished: true,
        area: 45,
        price: 120000,
        priceFrequency: JSON.stringify({
          mois: 6
        }),
        status: "A louer",
        city: "Yaoundé",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 1,
          "livingRooms": 1,
          "bathrooms": 1
        })
      },
      {
        createdAt: new Date("2024-11-01T10:21:12+01:00"),
        updatedAt: new Date(),
        title: "Villa spacieuse avec piscine",
        sellerId: "a08c080f-6019-4794-a9c2-a1fa286f55dd",
        hood: "Tradex Borne 10",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Une villa luxueuse avec 4 chambres, une grande piscine et un jardin.",
        property_type: "Villa",
        furnished: false,
        area: 350,
        price: 150000000,
        status: "A vendre",
        city: "Douala",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 4,
          "livingRooms": 2,
          "bathrooms": 3
        })
      },
      {
        createdAt: new Date("2024-06-29T02:53:38+01:00"),
        updatedAt: new Date(),
        title: "Appartement lumineux à louer",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Ndokoti",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Un appartement de 3 chambres situé dans un quartier calme avec vue panoramique.",
        property_type: "Appartement",
        furnished: false,
        area: 120,
        price: 300000,
        priceFrequency: JSON.stringify({
          "mois": 12
        }),
        status: "A louer",
        city: "Bafoussam",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 3,
          "livingRooms": 1,
          "bathrooms": 2
        })
      },
      {
        createdAt: new Date("2024-03-08T02:04:08+01:00"),
        updatedAt: new Date(),
        title: "Terrain idéal pour construction",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Bepanda",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Un terrain bien situé dans un quartier résidentiel en pleine expansion.",
        property_type: "Terrain",
        area: 500,
        price: 50000000,
        status: "A vendre",
        city: "Buéa"
      },
      {
        createdAt: new Date("2024-06-04T10:40:46+01:00"),
        updatedAt: new Date(),
        title: "Bureau équipé à louer",
        sellerId: "c1a0afd2-a42d-4be4-91f2-67c210fdd087",
        hood: "Tradex Borne 10",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=5.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Bureau entièrement équipé dans un immeuble moderne en plein centre-ville.",
        property_type: "Bureau",
        furnished: true,
        area: 50,
        price: 150000,
        priceFrequency: JSON.stringify({
          "mois": 1
        }),
        status: "A louer",
        city: "Bamenda",
        rooms: JSON.stringify({
          "kitchens": 0,
          "bedrooms": 0,
          "livingRooms": 0,
          "bathrooms": 1
        })
      },
      {
        createdAt: new Date("2024-10-26T09:14:29+01:00"),
        updatedAt: new Date(),
        title: "Salle de fêtes spacieuse",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Bepanda",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=6.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Une salle moderne pouvant accueillir jusqu'à 500 personnes.",
        property_type: "Salle de fêtes",
        furnished: false,
        area: 1000,
        price: 200000,
        priceFrequency: JSON.stringify({
          "jours": 1
        }),
        status: "A louer",
        city: "Ebolowa",
        rooms: JSON.stringify({
          "kitchens": 0,
          "bedrooms": 0,
          "livingRooms": 1,
          "bathrooms": 2
        })
      },
      {
        createdAt: new Date("2024-02-07T21:08:54+01:00"),
        updatedAt: new Date(),
        title: "Studio cosy à louer",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Tradex Borne 10",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=7.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Studio avec kitchenette et salle de bain, idéal pour les célibataires.",
        property_type: "Studio",
        furnished: true,
        area: 35,
        price: 100000,
        priceFrequency: JSON.stringify({
          "mois": 1
        }),
        status: "A louer",
        city: "Bertoua",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 1,
          "livingRooms": 0,
          "bathrooms": 1
        })
      },
      {
        createdAt: new Date("2024-07-20T14:38:25+01:00"),
        updatedAt: new Date(),
        title: "Duplex moderne avec jardin",
        sellerId: "9a738bae-5dd5-4fc1-a6f6-d2e8d260b15a",
        hood: "Cité des Palmiers",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=8.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Un duplex spacieux, parfait pour une famille.",
        property_type: "Duplex",
        furnished: false,
        area: 200,
        price: 80000000,
        status: "A vendre",
        city: "Ngaoundéré",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 3,
          "livingRooms": 1,
          "bathrooms": 3
        })
      },
      {
        createdAt: new Date("2024-05-08T05:57:24+01:00"),
        updatedAt: new Date(),
        title: "Immeuble commercial à vendre",
        sellerId: "9a738bae-5dd5-4fc1-a6f6-d2e8d260b15a",
        hood: "Carrefour Antonio",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=9.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Un immeuble de 5 étages dans une zone stratégique pour les affaires.",
        property_type: "Immeuble",
        furnished: false,
        area: 1000,
        price: 300000000,
        status: "A vendre",
        city: "Garoua",
        rooms: JSON.stringify({
          "kitchens": 0,
          "bedrooms": 0,
          "livingRooms": 10,
          "bathrooms": 10
        })
      },
      {
        createdAt: new Date("2024-09-10T08:31:53+01:00"),
        updatedAt: new Date(),
        title: "Appartement déjà pris",
        sellerId: "48f905cc-3817-452f-ae7a-faeeb45c1ae9",
        hood: "Cité des Palmiers",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=10.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Cet appartement de 2 chambres est actuellement indisponible.",
        property_type: "Appartement",
        furnished: false,
        area: 90,
        price: 250000,
        status: "Déja pris",
        city: "Maroua",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 2,
          "livingRooms": 1,
          "bathrooms": 1
        })
      },
      {
        createdAt: new Date("2024-01-11T15:47:16+01:00"),
        updatedAt: new Date(),
        title: "Villa de luxe à louer",
        sellerId: "9a738bae-5dd5-4fc1-a6f6-d2e8d260b15a",
        hood: "Carrefour Menoua",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=11.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Une villa entièrement meublée avec piscine et garage spacieux.",
        property_type: "Villa",
        furnished: true,
        area: 400,
        price: 500000,
        priceFrequency: JSON.stringify({
          "semaines": 2
        }),
        status: "A louer",
        city: "Yaoundé",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 5,
          "livingRooms": 2,
          "bathrooms": 4
        })
      },
      {
        createdAt: new Date("2024-11-02T03:36:56+01:00"),
        updatedAt: new Date(),
        title: "Terrain agricole à vendre",
        sellerId: "a08c080f-6019-4794-a9c2-a1fa286f55dd",
        hood: "Ndokoti",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=12.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Un grand terrain parfait pour des projets agricoles.",
        property_type: "Terrain",
        area: 10000,
        price: 30000000,
        status: "A vendre",
        city: "Douala"
      },
      {
        createdAt: new Date("2024-05-15T23:47:50+01:00"),
        updatedAt: new Date(),
        title: "Bureau moderne à louer",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Terminus",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=13.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Un espace de bureau bien situé dans un immeuble sécurisé.",
        property_type: "Bureau",
        furnished: true,
        area: 75,
        price: 250000,
        priceFrequency: JSON.stringify({
          "mois": 1
        }),
        status: "A louer",
        city: "Bafoussam",
        rooms: JSON.stringify({
          "kitchens": 0,
          "bedrooms": 0,
          "livingRooms": 0,
          "bathrooms": 2
        })
      },
      {
        createdAt: new Date("2024-09-23T18:20:38+01:00"),
        updatedAt: new Date(),
        title: "Immeuble commercial déjà pris",
        sellerId: "a08c080f-6019-4794-a9c2-a1fa286f55dd",
        hood: "Bali",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=14.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Cet immeuble est actuellement occupé par une entreprise.",
        property_type: "Immeuble",
        furnished: false,
        area: 1200,
        price: 0,
        status: "Déja pris",
        city: "Buéa",
        rooms: JSON.stringify({
          "kitchens": 0,
          "bedrooms": 0,
          "livingRooms": 12,
          "bathrooms": 10
        })
      },
      {
        createdAt: new Date("2024-12-08T21:29:03+01:00"),
        updatedAt: new Date(),
        title: "Studio économique à louer",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Carrefour Antonio",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=15.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Studio abordable dans un quartier populaire.",
        property_type: "Studio",
        furnished: false,
        area: 30,
        price: 80000,
        priceFrequency: JSON.stringify({
          "mois": 1
        }),
        status: "A louer",
        city: "Bamenda",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 1,
          "livingRooms": 0,
          "bathrooms": 1
        })
      },
      {
        createdAt: new Date("2024-04-15T21:56:46+01:00"),
        updatedAt: new Date(),
        title: "Appartement avec terrasse",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Bali",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=16.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Un appartement meublé avec une belle terrasse.",
        property_type: "Appartement",
        furnished: true,
        area: 110,
        price: 400000,
        priceFrequency: JSON.stringify({
          "mois": 12
        }),
        status: "A louer",
        city: "Ebolowa",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 3,
          "livingRooms": 1,
          "bathrooms": 2
        })
      },
      {
        createdAt: new Date("2024-09-10T04:41:43+01:00"),
        updatedAt: new Date(),
        title: "Villa avec jardin",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Tradex Borne 10",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=17.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Villa bien aménagée avec jardin et garage spacieux.",
        property_type: "Villa",
        furnished: false,
        area: 350,
        price: 200000000,
        status: "A vendre",
        city: "Bertoua",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 4,
          "livingRooms": 2,
          "bathrooms": 3
        })
      },
      {
        createdAt: new Date("2024-01-28T05:28:01+01:00"),
        updatedAt: new Date(),
        title: "Salle de réception à louer",
        sellerId: "9a738bae-5dd5-4fc1-a6f6-d2e8d260b15a",
        hood: "Ndokoti",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=18.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Salle idéale pour mariages et événements.",
        property_type: "Salle de fêtes",
        furnished: true,
        area: 800,
        price: 150000,
        priceFrequency: JSON.stringify({
          "jours": 1
        }),
        status: "A louer",
        city: "Ngaoundéré",
        rooms: JSON.stringify({
          "kitchens": 0,
          "bedrooms": 0,
          "livingRooms": 0,
          "bathrooms": 2
        })
      },
      {
        createdAt: new Date("2024-03-09T01:39:17+01:00"),
        updatedAt: new Date(),
        title: "Terrain résidentiel à vendre",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Carrefour Menoua",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=19.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Parfait pour une future maison ou une construction résidentielle.",
        property_type: "Terrain",
        area: 600,
        price: 70000000,
        status: "A vendre",
        city: "Garoua"
      },
      {
        createdAt: new Date("2024-06-06T08:47:43+01:00"),
        updatedAt: new Date(),
        title: "Studio confortable à louer",
        sellerId: "c1a0afd2-a42d-4be4-91f2-67c210fdd087",
        hood: "Entrée Billes",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=20.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Studio entièrement meublé avec balcon.",
        property_type: "Studio",
        furnished: true,
        area: 40,
        price: 120000,
        priceFrequency: JSON.stringify({
          "mois": 1
        }),
        status: "A louer",
        city: "Maroua",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 1,
          "livingRooms": 0,
          "bathrooms": 1
        })
      },
      {
        createdAt: new Date("2024-07-06T05:34:24+01:00"),
        updatedAt: new Date(),
        title: "Appartement haut de gamme avec vue sur la mer",
        sellerId: "c1a0afd2-a42d-4be4-91f2-67c210fdd087",
        hood: "Bali",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=21.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Situé dans un quartier résidentiel calme, cet appartement de 2 chambres offre une vue imprenable. Il dispose d'un grand balcon, d'une cuisine moderne entièrement équipée, et d'un salon spacieux avec de grandes baies vitrées",
        property_type: "Appartement",
        furnished: true,
        area: 130,
        price: 750000,
        priceFrequency: JSON.stringify({
          "mois": 1
        }),
        status: "A louer",
        city: "Kribi",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 2,
          "livingRooms": 1,
          "bathrooms": 2
        })
      },
      {
        createdAt: new Date("2024-06-01T20:51:19+01:00"),
        updatedAt: new Date(),
        title: "Complexe résidentiel à vendre",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Bali",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=22.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Ce complexe résidentiel comprend 10 appartements de 3 chambres chacun, un jardin commun. Situé à proximité des écoles, des hôpitaux et des centres commerciaux, il constitue une opportunité exceptionnelle pour les investisseurs immobiliers.",
        property_type: "Immeuble",
        furnished: false,
        area: 2000,
        price: 500000000,
        status: "A vendre",
        city: "Douala",
        rooms: JSON.stringify({
          "kitchens": 10,
          "bedrooms": 30,
          "livingRooms": 10,
          "bathrooms": 30
        })
      },
      {
        createdAt: new Date("2024-09-08T16:59:53+01:00"),
        updatedAt: new Date(),
        title: "Maison traditionnelle avec grand terrain",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Carrefour Antonio",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=23.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Cette maison construite dans un style traditionnel camerounais est entourée d’un vaste terrain de 1 hectare, idéal pour les projets agricoles ou pour une grande résidence familiale. ",
        property_type: "Maison",
        furnished: false,
        area: 150,
        price: 90000000,
        status: "A vendre",
        city: "Édéa",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 4,
          "livingRooms": 1,
          "bathrooms": 2
        })
      },
      {
        createdAt: new Date("2024-10-10T11:46:13+01:00"),
        updatedAt: new Date(),
        title: "Penthouse de luxe avec piscine privée",
        sellerId: "48f905cc-3817-452f-ae7a-faeeb45c1ae9",
        hood: "Ndokoti",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=24.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Ce penthouse exclusif, situé au dernier étage d’un immeuble moderne, offre une piscine privée sur le toit et une vue panoramique sur la ville.",
        property_type: "Appartement",
        furnished: true,
        area: 300,
        price: 2500000,
        priceFrequency: JSON.stringify({
          "mois": 1
        }),
        status: "A louer",
        city: "Yaoundé",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 4,
          "livingRooms": 2,
          "bathrooms": 4
        })
      },
      {
        createdAt: new Date("2024-09-01T03:58:34+01:00"),
        updatedAt: new Date(),
        title: "Hôtel boutique à vendre",
        sellerId: "a08c080f-6019-4794-a9c2-a1fa286f55dd",
        hood: "Bali",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=25.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Cet hôtel boutique comprend 15 chambres élégantes, chacune avec salle de bain privative et balcon. Il dispose également d’un restaurant, d’un bar, d’une piscine et d’une salle de conférence.",
        property_type: "Hôtel",
        furnished: true,
        area: 1200,
        price: 800000000,
        status: "A vendre",
        city: "Kribi",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 15,
          "livingRooms": 1,
          "bathrooms": 15
        })
      },


      {
        createdAt: new Date("2024-11-07T00:11:22+01:00"),
        updatedAt: new Date(),
        title: "Entrepôt spacieux pour usage commercial",
        sellerId: "a08c080f-6019-4794-a9c2-a1fa286f55dd",
        hood: "Tradex Borne 10",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=26.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Cet entrepôt de 1000 m² est idéal pour des activités industrielles ou commerciales. Il est équipé de plusieurs points d’accès, de grandes portes pour le chargement, et d’un espace de bureau intégré.",
        property_type: "Entrepôt",
        furnished: false,
        area: 1000,
        price: 25000000,
        status: "A louer",
        city: "Douala"
      },
      {
        createdAt: new Date("2024-10-23T14:55:30+01:00"),
        updatedAt: new Date(),
        title: "Maison moderne avec toit-terrasse",
        sellerId: "48f905cc-3817-452f-ae7a-faeeb45c1ae9",
        hood: "Cité des Palmiers",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=27.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Cette maison contemporaine est dotée d’un toit-terrasse aménagé avec vue sur la ville. Elle comprend 3 chambres, 2 salles de bain, une cuisine équipée, et un salon lumineux avec de grandes fenêtres. ",
        property_type: "Maison",
        furnished: false,
        area: 180,
        price: 60000000,
        status: "A vendre",
        city: "Bafoussam",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 3,
          "livingRooms": 1,
          "bathrooms": 2
        })
      },
      {
        createdAt: new Date("2024-09-03T08:45:09+01:00"),
        updatedAt: new Date(),
        title: "Villa avec court de tennis",
        sellerId: "a08c080f-6019-4794-a9c2-a1fa286f55dd",
        hood: "Carrefour non glacé",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=28.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Cette villa haut de gamme offre un court de tennis privé, une piscine chauffée, et un jardin paysager. Elle dispose de 5 chambres, de 4 salles de bain, d’une cuisine moderne et d’un salon spacieux.",
        property_type: "Villa",
        furnished: true,
        area: 500,
        price: 300000000,
        status: "A vendre",
        city: "Yaoundé",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 5,
          "livingRooms": 2,
          "bathrooms": 4
        })
      },
      {
        createdAt: new Date("2024-02-14T00:01:51+01:00"),
        updatedAt: new Date(),
        title: "Terrain en bord de rivière",
        sellerId: "48f905cc-3817-452f-ae7a-faeeb45c1ae9",
        hood: "Entrée Billes",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=29.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Ce terrain de 2000 m² est situé le long d’une belle rivière, offrant une vue magnifique et un environnement paisible. ",
        property_type: "Terrain",
        area: 2000,
        price: 150000000,
        status: "A vendre",
        city: "Buéa"
      },
      {
        createdAt: new Date("2024-09-19T00:07:45+01:00"),
        updatedAt: new Date(),
        title: "Appartement duplex au centre-ville",
        sellerId: "5af74ece-a3d5-4a0e-896c-6db970759453",
        hood: "Tradex Borne 10",
        images: [
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=30.jpeg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F2.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F3.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F4.jpg&version_id=null",
          "http://127.0.0.1:9001/api/v1/buckets/properties-images/objects/download?preview=true&prefix=single%2F5.jpg&version_id=null"
        ],
        description: "Ce duplex moderne est idéalement situé au centre-ville, à proximité des commerces et des transports. Avec 2 chambres, un salon spacieux, une cuisine équipée et un balcon, cet appartement offre tout le confort nécessaire à une vie urbaine.",
        property_type: "Appartement",
        furnished: false,
        area: 140,
        price: 400000,
        priceFrequency: JSON.stringify({
          "mois": 1
        }),
        status: "A louer",
        city: "Bamenda",
        rooms: JSON.stringify({
          "kitchens": 1,
          "bedrooms": 2,
          "livingRooms": 1,
          "bathrooms": 2
        })
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
