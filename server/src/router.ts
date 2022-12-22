import express from 'express';
import reviewController from './review/review.controller';
import userController from './user/user.controller';
import signInController from './user/signIn.controller';
import commentController from './comment/comment.controller';

const reviewRouter = express.Router();
const userRouter = express.Router();

// review
reviewRouter.get('/', reviewController.findMany);
reviewRouter.get('/:id', reviewController.findOne);
reviewRouter.post('/', reviewController.createOne);
reviewRouter.put('/:id', reviewController.updateOne);
reviewRouter.delete('/:id', reviewController.deleteOne);
reviewRouter.post('/:id/wishlist', reviewController.wish);
reviewRouter.delete('/:id/wishlist', reviewController.unWish);
reviewRouter.delete('/:id/wishlist/:wishlistId', reviewController.unWish);
reviewRouter.post('/:id/photos', reviewController.replacePhoto);

// comment
reviewRouter.get('/:id/comments/', commentController.findMany);
reviewRouter.get('/:id/comments/:commentId', commentController.findOne);
reviewRouter.post('/:id/comments', commentController.createOne);
reviewRouter.put('/:id/comments/:commentId', commentController.updateOne);
reviewRouter.delete('/:id/comments/:commentId', commentController.deleteOne);

// user
userRouter.get('/:id', userController.findOne);
userRouter.post('/', userController.createOne);
userRouter.put(`/:id`, userController.updateOne);
userRouter.delete('/:id', userController.deleteOne);
userRouter.post('/signIn', signInController.signIn);

export { reviewRouter, userRouter };
