import express from 'express';
const router = express.Router();
import userController from '../controllers/usersController';

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/user/:userId', userController.allowIfLoggedin, userController.getSingleUser);
router.get(
  '/users',
  userController.allowIfLoggedin,
  userController.grantAccess('readAny', 'profile'),
  userController.getAllUsers
);
router.put(
  '/user/:userId',
  userController.allowIfLoggedin,
  userController.grantAccess('updateAny', 'profile'),
  userController.updateUser
);
router.delete(
  '/user/:userId',
  userController.allowIfLoggedin,
  userController.grantAccess('deleteAny', 'profile'),
  userController.deleteUser
);

export default router;
