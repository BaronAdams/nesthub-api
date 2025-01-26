import { CreatePropertyDto } from './dto/create-property.dto';
import Property from './property.model';
import { Op } from 'sequelize';

// Fonction pour créer une propriété
export const createProperty = async (propertyData: CreatePropertyDto) => {
  try {
    const property = await Property.create(propertyData);
    return property;
  } catch (error) {
    console.log(`Erreur lors de la création de la propriété`);
    console.log(error)
  }
};

// Fonction pour récupérer tous les propriétés
export const getProperties = async (page?: number) => {
  try {
    const properties = await Property.findAll({
      include: [
        { 
          association:"reviews",
          attributes:["stars"]
         }
      ],
      attributes:{ exclude: ["furnished","sellerId","description"]}
    });
    return properties;
  } catch (error) {
    console.log(`Erreur lors de la récupérations des propriétés`);
    console.log(error)
  }
};

// Fonction pour récupérer une propriété par ID
export const getPropertyById = async (id: string) => {
  try {
    const property = await Property.findByPk(id,{
      include: [
        { association:"reviews",
          include:[
            {
              association : "author",
              attributes:["id","firstName","lastName","profilePic"]
            }
          ]
         },
        { 
          association:"seller",
          attributes:["id","firstName","lastName","email","phone","profilePic"]
        }
      ]
    });
    if (!property) throw new Error('Propriété introuvable');
    return property;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de la propriété`);
  }
};

// Fonction pour mettre à jour une propriété
export const updateProperty = async (id: string, data: any) => {
  try {
    const [affectedCounts, affectedRows] = await Property.update(data,{
      where : { id },
      returning:true
  })
  if(affectedCounts === 0) throw new Error("La propriété dont vous voulez modifier n'existe pas")
  let updatedProperty = affectedRows[0].dataValues
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
export const searchPropertiesByType = async (property_type: string, page?: number) => {
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
export const searchPropertiesByPrice = async (minPrice: number, maxPrice: number, page?: number) => {
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
export const searchPropertiesByLocation = async (city: string, page?: number) => {
  try {
    const properties = await Property.findAll({
      where: { city: { [Op.like]: `%${city}%` } }
    });
    return properties;
  } catch (error) {
    throw new Error(`Erreur lors de la recherche de propriétés par localisation`);
  }
};

// Rechercher des propriétés par nombre de chambres
export const searchPropertiesByRooms = async (minRooms: number, maxRooms: number, page?: number) => {
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
export const searchPropertiesByStatus = async (status: string, page?: number) => {
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
export const searchProperties = async (filters: any) => {
  try {
    const conditions: any = {};
    if (filters.property_type) conditions.property_type = { [Op.in] : filters.property_type.split(",")};
    if (filters.status) conditions.status = { [Op.in]: filters.status.split(",") };
    if (filters.city) conditions.city = { [Op.in]: filters.city.split(",") };
    if (filters.hood) conditions.hood = { [Op.in]: filters.hood.split(",") };
    if (filters.sellerId) conditions.sellerId = { [Op.in]: filters.sellerId.split(",") };
    if (filters.minPrice && filters.maxPrice) {
      conditions.price = { [Op.between]: [filters.minPrice, filters.maxPrice] };
    }
    // if (filters.minRooms && filters.maxRooms) {
    //   conditions.rooms = { [Op.between]: [filters.minRooms, filters.maxRooms] };
    // }
    let page = filters?.page ? filters.page : 1 
    let limit = filters?.limit ? filters.limit : 12
    let order = filters.orderByLatest ? [['updatedAt','DESC']] : []
    order = filters.orderByTrend ? [['stars','DESC'], ['likedBy','DESC'], ['savedBy','DESC']] : order

    const properties = await Property.findAll({
      where: conditions,
      offset: (page - 1) * limit,
      limit,
      // @ts-ignore
      order,
      include: [
        { 
          association:"reviews",
          attributes:["stars"]
         }
      ],
      attributes:{ exclude: ["furnished","sellerId","description"]}
    });
    return properties;
  } catch (error) {
    throw new Error(`Erreur lors de la recherche de propriétés`);
  }
};

// Fonction pour ajouter liker/déliker une propriété
export const likeOrUnlikeProperty = async (propertyId: string, userId: string) => {
  const property = await Property.findByPk(propertyId);
  if (!property) throw new Error('Propriété introuvable');
  let msg = ""
  if (!property.likedBy.includes(userId)) {
    property.likedBy.push(userId);
    msg = "Propriété ajoutée aux favoris"
  } else {
    property.likedBy = property.likedBy.filter((id) => id !== userId);
    msg = "Propriété retirée des favoris"
  }
  const { id, likedBy } = property.dataValues
  try {
    await Property.update({likedBy},{
      where: { id }
    });
    return msg
  } catch (error) {
    console.log(error)
    throw new Error(`Une erreur est survenue`);
  }
}

export const saveOrUnsaveProperty = async (propertyId: string, userId: string) =>{
  const property = await Property.findByPk(propertyId);
  if (!property) throw new Error('Propriété introuvable');
  let msg = ""
  if (!property.savedBy.includes(userId)) {
    property.savedBy.push(userId);
    msg = "Propriété ajoutée aux enregistrées"
  } else {
    property.savedBy = property.savedBy.filter((id) => id !== userId);
    msg = "Propriété retirée des enregistrées"
  }
  const { id, savedBy } = property.dataValues
  try {
    await Property.update({savedBy},{
      where: { id }
    });
    return msg
  } catch (error) {
    console.log(error)
    throw new Error(`Une erreur est survenue`);
  }
}


