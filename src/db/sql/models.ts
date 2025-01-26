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
import ChatMessage from '../../modules/chatmessage/chatmessage.model'
import Review from '../../modules/review/review.model'
import Subscription from '../../modules/subscription/subscription.model'

const models = {
    Admin,
    BlackListedToken,
    PropertyReview,
    UserReview,
    Review,
    Chat,
    ChatMessage,
    Comment,
    ContactMessage,
    Property,
    User,
    Post,
    Subscription
};

export default models
