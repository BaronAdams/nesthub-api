import Admin from "../models/admin";
import Agency from "../models/agency";
import Agent from "../models/agent";
import Comment from "../models/comment";
import Post from "../models/post";
import Property from "../models/property";
import Subscription from "../models/subscription";
import User from "../models/user";

export default function(){
    Subscription.hasMany(Agency, { foreignKey: 'subscriptionId' });
    Agency.belongsTo(Subscription, { foreignKey: 'subscriptionId' });

    Agency.hasMany(Agent, { foreignKey: 'agencyId' });
    Agent.belongsTo(Agency, { foreignKey: 'agencyId' });

    Admin.hasMany(Post, { foreignKey: 'adminId' });
    Post.belongsTo(Admin, { foreignKey: 'adminId' });

    Post.hasMany(Comment, { foreignKey: 'postId' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });
    
    User.hasMany(Property, { foreignKey: 'sellerId' });
    Property.belongsTo(User, { foreignKey: 'sellerId' });

    Agent.hasMany(Property, { foreignKey: 'agentId' });
    Property.belongsTo(Agent, { foreignKey: 'agentId' });

}