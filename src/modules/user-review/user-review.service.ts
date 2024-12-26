import { CreateUserReviewDto } from './dto/create-user-review.dto';
import UserReview from './user-review.model';
import { UpdateUserReviewDto } from './dto/update-user-review.dto';

// Fonction pour créer une propriété
export const createUserReview = async (reviewData: CreateUserReviewDto) => {
  try {
    const userReview = await UserReview.create(reviewData);
    return userReview;
  } catch (error) {
    console.log(`Erreur lors de la création de la propriété`);
    console.log(error)
  }
};

export const updateUserReview = async(id:string, data: UpdateUserReviewDto)=> {
    const [affectedCounts, affectedRows] = await UserReview.update(data,{
        where : { id },
        returning:true
    })
    if(affectedCounts === 0) throw new Error("Le user n'existe pas")
    // let { password, ...others } = affectedRows[0].dataValues
    // return affectedRows[0].dataValues
}

// Fonction pour supprimer une propriété
export const deleteUserReview = async (id: string) => {
    try {
      const review = await UserReview.findByPk(id);
      if(!review) throw new Error(`Le feedback n'existe pas`);
      await review.destroy();
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la propriété`);
    }
};