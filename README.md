# Backend de l'application Immobilière Nesthub

Ce backend constitue le cœur de l'application immobilière. Il est développé avec **Express** et **TypeScript**, utilise **Sequelize** comme ORM, et assure la validation des données grâce à **express-validator**. Cette application propose deux versions distinctes, chacune ayant des fonctionnalités adaptées à différents besoins des utilisateurs.

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
5. La documentation de l'API est disponible à `/api-docs` si Swagger est configuré.

## Conclusion
Ce backend offre une solution robuste et évolutive pour la gestion d'une application immobilière. Les deux versions permettent une flexibilité d'utilisation selon les besoins des utilisateurs, avec un accent particulier sur la sécurité et les performances.

