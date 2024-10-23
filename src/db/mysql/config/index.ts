import Admin from '../../../modules/admin/admin.model'
import Agency from '../../../modules/agency/agency.model'
import AgencyUser from '../../../modules/agencyuser/agencyuser.model'
import BlackListedToken from '../../../modules/blt/blt.model'
import Comment from '../../../modules/comment/comment.model'
import ContactMessage from '../../../modules/contactmessage/contactmessage.model'
import Invitation from '../../../modules/invitation/invitation.model'
import Post from '../../../modules/post/post.model'
import Property from '../../../modules/property/property.model'
import Review from '../../../modules/review/review.model'
import Subscription from '../../../modules/subscription/subscription.model'
import User from '../../../modules/user/user.model'
import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize(
    {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'real-estate-db',
      models: [User,Post,Admin,Agency,AgencyUser,BlackListedToken,Comment,ContactMessage,Invitation,Property,Review,Subscription],
    }
)

