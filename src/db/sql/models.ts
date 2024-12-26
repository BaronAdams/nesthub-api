import Admin from '../../modules/admin/admin.model'
import BlackListedToken from '../../modules/blt/blt.model'
import Comment from '../../modules/comment/comment.model'
import ContactMessage from '../../modules/contactmessage/contactmessage.model'
import Post from '../../modules/post/post.model'
import Property from '../../modules/property/property.model'
import User from '../../modules/user/user.model'
import Chat from '../../modules/chat/chat.model'
import PropertyReview from '../../modules/propertyreview/propertyreview.model'
import UserReview from '../../modules/user-review/user-review.model'

const models = {
    Admin,
    BlackListedToken,
    PropertyReview,
    UserReview,
    Chat,
    Comment,
    ContactMessage,
    Property,
    User,
    Post
};

export default models
