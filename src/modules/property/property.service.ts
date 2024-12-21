import { CreatePropertyDto } from './dto/create-property.dto';
import Property from './property.model';
import { Op } from 'sequelize';

// Fonction pour créer une propriété
export const createProperty = async (propertyData: CreatePropertyDto) => {
  try {
    const property = await Property.create(propertyData);
    return property;
  } catch (error) {
    throw new Error(`Erreur lors de la création de la propriété`);
  }
};

// Fonction pour récupérer tous les propriétés
export const getProperties = async (page?:number) => {
  try {
    const properties = await Property.findAll();
    return properties;
  } catch (error) {
    throw new Error(`Erreur lors de la récupérations des propriétés`);
  }
};

// Fonction pour récupérer une propriété par ID
export const getPropertyById = async (id: string) => {
  try {
    const property = await Property.findByPk(id);
    if (!property) throw new Error('Propriété introuvable');
    return property;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de la propriété`);
  }
};

// Fonction pour mettre à jour une propriété
export const updateProperty = async (id: string, updateData: any) => {
  try {
    const property = await getPropertyById(id);
    const updatedProperty = await property.update(updateData);
    return updatedProperty;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de la propriété`);
  }
};

// Fonction pour supprimer une propriété
export const deleteProperty = async (id: string) => {
  try {
    const property = await getPropertyById(id);
    await property.destroy();
    return `Propriété avec l'ID ${id} a été supprimée avec succès`;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de la propriété`);
  }
};

// Rechercher des propriétés par type
export const searchPropertiesByType = async (property_type: string, page?:number) => {
  try {
    const properties = await Property.findAll({
      where: { property_type }
    });
    return properties;
  } catch (error) {
    throw new Error(`Erreur lors de la recherche de propriétés par type`);
  }
};

// Rechercher des propriétés par prix
export const searchPropertiesByPrice = async (minPrice: number, maxPrice: number, page?:number) => {
  try {
    const properties = await Property.findAll({
      where: {
        price: {
          [Op.between]: [minPrice, maxPrice]
        }
      }
    });
    return properties;
  } catch (error) {
    throw new Error(`Erreur lors de la recherche de propriétés par prix`);
  }
};

// Rechercher des propriétés par localisation
export const searchPropertiesByLocation = async (place: string, page?:number) => {
  try {
    const properties = await Property.findAll({
      where: { place: { [Op.like]: `%${place}%` } }
    });
    return properties;
  } catch (error) {
    throw new Error(`Erreur lors de la recherche de propriétés par localisation`);
  }
};

// Rechercher des propriétés par nombre de chambres
export const searchPropertiesByRooms = async (minRooms: number, maxRooms: number, page?:number) => {
  try {
    const properties = await Property.findAll({
      where: {
        rooms: {
          [Op.between]: [minRooms, maxRooms]
        }
      }
    });
    return properties;
  } catch (error) {
    throw new Error(`Erreur lors de la recherche de propriétés par nombre de chambres`);
  }
};


// Fonction de recherche des propriétés selon le statut (à louer ou à vendre)
export const searchPropertiesByStatus = async (status: string, page?:number) => {
  try {
    const properties = await Property.findAll({
      where: {
        status
      }
    });
    return properties;
  } catch (error) {
    throw new Error(`Erreur lors de la recherche des propriétés`);
  }
};


// Fonction de recherche générale (prix, type, localisation,nombre de chambres, statut etc.)
export const searchProperties = async (filters: any, page?:number) => {
  try {
    const conditions: any = {};
    if (filters.property_type) conditions.property_type = filters.property_type;
    if (filters.status) conditions.status = filters.status;
    if (filters.location) conditions.location = { [Op.like]: `%${filters.location}%` };
    if (filters.minPrice && filters.maxPrice) {
      conditions.price = { [Op.between]: [filters.minPrice, filters.maxPrice] };
    }
    if (filters.minRooms && filters.maxRooms) {
      conditions.rooms = { [Op.between]: [filters.minRooms, filters.maxRooms] };
    }

    const properties = await Property.findAll({
      where: conditions
    });

    return properties;
  } catch (error) {
    throw new Error(`Erreur lors de la recherche de propriétés`);
  }
};

