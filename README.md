# Backend de l'application Nesthub

Ce repo git est le backend de l'application Nesthub. Cette application propose deux versions distinctes, chacune ayant des fonctionnalités adaptées à différents besoins des utilisateurs.

## Technologies utilisés
### Langage et Frameworks
- **Node.js** : Environnement d'exécution JavaScript.
- **Express.js** : Framework web pour construire l'API de manière rapide et efficace.
- **TypeScript** : Superset de JavaScript qui ajoute des types statiques, permettant une meilleure robustesse et maintenabilité.

### Bases de données (au choix)
- **PostgreSQL** : Base de données relationnelle robuste et performante.
  - **Sequelize** : ORM (Object Relational Mapper) pour interagir avec PostgreSQL.
  - **Sequelize-TypeScript** : Extension pour intégrer TypeScript avec Sequelize.

- **AWS DynamoDB** : Base de données NoSQL entièrement gérée par Amazon Web Services, idéale pour des applications nécessitant une haute disponibilité.
  - **Dynamoose** : ORM simplifiant les interactions avec DynamoDB.

### Validation
- **Express-validator** : Validation des corps de requête pour assurer l'intégrité des données en entrée.
- **json-schema-to-ts** : Génération de DTOs (Data Transfer Objects) à partir de schémas JSON pour garantir une validation stricte des données.

### Authentification
- **JWT (JSON Web Tokens)** : Gestion des tokens pour sécuriser l'authentification et les autorisations.

### Fonctionnalités en temps réel
- **Socket.IO** : Bibliothèque pour gérer les données en temps réel, utilisée pour les notifications et les chats de messagerie.

### Paiements
- **MeSomb** : Plateforme d'intégration pour les paiements mobiles via Orange Money et MTN Mobile Money, adaptée aux transactions courantes dans la région.

### Sécurité
- **Bcrypt** : Pour le hachage des mots de passe, garantissant leur sécurité dans la base de données.

## Fonctionnalités communes aux deux versions

### Authentification et gestion des utilisateurs
- Inscription des utilisateurs avec différents rôles : **acheteur**, **vendeur**, ou **acheteur-vendeur**.
- Connexion sécurisée via un système de **tokens JWT**.
- Récupération et mise à jour des informations utilisateur.

### Gestion des propriétés
- Ajout, modification et suppression des propriétés immobilières par les vendeurs.
- Catégorisation des propriétés : appartements, studios, villas, terrains, etc.
- Affichage des détails des propriétés, y compris les éléments suivants :
  - Superficie
  - Prix
  - Type de location (par jour, semaine, mois, etc.)
  - Nombre de pièces (chambres, cuisines, salles de bain)

### Forfaits et abonnements
- Les **acheteurs** peuvent souscrire à un **forfait mensuel** pour avoir accès aux informations de contact des vendeurs.
- Les **vendeurs** peuvent souscrire à un forfait mensuel variable leur permettant de poster un nombre limité de propriétés.

### Interactions utilisateur
- Possibilité de **liker** et d'**enregistrer** des propriétés pour consultation ultérieure.
- Système de recherche avancée basé sur divers filtres : prix, localisation, type de propriété, etc.

## Version 1 : Fonctionnalités sans gestion des agences
Dans cette version, les utilisateurs interagissent directement avec les fonctionnalités de l'application sans structure organisationnelle d'agence.

### Points clés :
- L'inscription des utilisateurs est simple : ils choisissent d'être acheteurs, vendeurs ou les deux.
- Les acheteurs et les vendeurs souscrivent à des forfaits individuels pour accéder aux fonctionnalités avancées (contact, publication).
- Les propriétés publiées sont accessibles à tous les utilisateurs de l'application.

## Version 2 : Fonctionnalités avec gestion des agences
Cette version inclut toutes les fonctionnalités de la Version 1 avec des améliorations majeures permettant la création et la gestion d'agences virtuelles.

### Gestion des agences
- **Création d'une agence** par un utilisateur (propriétaire de l'agence) moyennant un forfait mensuel.
- Les agences peuvent ajouter des **agents immobiliers** avec des permissions spécifiques.
- Les agents peuvent publier et gérer des propriétés pour le compte de l'agence ou des vendeurs liés à l'agence.

### Publication de propriétés au sein des agences
- Les propriétés sont associées à une agence ou à un vendeur individuel.
- Les agences peuvent gérer un nombre illimité de propriétés en fonction du forfait choisi.

### Interaction utilisateur-améliorée
- Les utilisateurs peuvent rechercher des agences et consulter les propriétés associées.
- Les agences peuvent inviter de nouveaux agents via des liens d'invitation.

## Modèles de données principaux

### Modèle User
- **id** (UUID)
- **nom**, **email**, **mot de passe**
- **rôle** : acheteur, vendeur, acheteur-vendeur
- **forfaits souscrits**
- **propriétés likées/enregistrées** (tableaux d'IDs)

### Modèle Property
- **id** (UUID)
- **titre**, **description**, **prix**, **type** (location/vente)
- **superficie**, **pièces** (chambres, cuisines, salles de bain)
- **créé par** : vendeur ou agence

### Modèle Agency (Version 2 uniquement)
- **id** (UUID)
- **nom**, **propriétaire** (utilisateur créateur de l'agence)
- **agents** (liste d'utilisateurs avec permissions)
- **forfaits souscrits**

## API REST
Le backend expose une API REST structurée, incluant les routes suivantes :

### Routes utilisateurs
- `POST /users/register` : Inscription d'un utilisateur
- `POST /users/login` : Connexion
- `GET /users/me` : Récupération des informations utilisateur
- `PUT /users/update` : Mise à jour du profil

### Routes propriétés
- `POST /properties` : Création d'une propriété
- `GET /properties` : Liste des propriétés
- `GET /properties/:id` : Détails d'une propriété
- `PUT /properties/:id` : Mise à jour d'une propriété
- `DELETE /properties/:id` : Suppression d'une propriété

### Routes agences (Version 2 uniquement)
- `POST /agencies` : Création d'une agence
- `GET /agencies` : Liste des agences
- `POST /agencies/:id/invite` : Invitation d'agents à une agence

## Sécurité
- Toutes les routes sensibles sont protégées par un système de tokens JWT.
- Validation des entrées utilisateur avec **express-validator**.
- Protection contre les attaques XSS et CSRF.

## Installation et exécution
1. Clonez le dépôt.
2. Installez les dépendances : `npm install`
3. Configurez les variables d'environnement (base de données, JWT, etc.).
4. Lancez le serveur en mode développement : `npm run dev`.



