import { CreatePropertyReviewDto } from './dto/create-property-review.dto';
import PropertyReview from './propertyreview.model';
import { UpdatePropertyReviewDto } from './dto/update-property-review.dto';

// Fonction pour créer une propriété
export const getPropertyReviews = async () => {
  try {
    const propertyReviews = await PropertyReview.findAll();
    return propertyReviews;
  } catch (error) {
    console.log(`Erreur lors de la recupérationde de données`);
    console.log(error)
  }
};

export const createPropertyReview = async (reviewData: CreatePropertyReviewDto) => {
  try {
    const propertyReview = await PropertyReview.create(reviewData);
    return propertyReview;
  } catch (error) {
    console.log(`Erreur lors de la création du feedback`);
    console.log(error)
  }
};

export const updatePropertyReview = async(id:string, data: UpdatePropertyReviewDto)=> {
    const [affectedCounts, affectedRows] = await PropertyReview.update(data,{
        where : { id },
        returning:true
    })
    if(affectedCounts === 0) throw new Error("Le user n'existe pas")
    // let { password, ...others } = affectedRows[0].dataValues
    // return affectedRows[0].dataValues
}

// Fonction pour supprimer une propriété
export const deletePropertyReview = async (id: string) => {
    try {
      const review = await PropertyReview.findByPk(id);
      if(!review) throw new Error(`Le feedback n'existe pas`);
      await review.destroy();
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la propriété`);
    }
};