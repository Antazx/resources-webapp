import User from '../models/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import roleController from './roles';

const hashPassword = async password => {
  return await bcrypt.hash(password, 10);
};

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const signup = async (req, res, next) => {
  try {
    const { name, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, password: hashedPassword, role: role || 'basic' });
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({ data: newUser, accessToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      let error = new Error('There is no user with that username');
      error.statusCode = 401;
      error.message = 'There is no user with that username';
      console.log(error);
      return next(error);
    }
    console.log(password + ' ' + user.password);
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) {
      let error = new Error('Password is not correct');
      error.message = 'Password is not correct';
      error.statusCode;
      return next(error);
    }
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    await User.findByIdAndUpdate(user._id, { accessToken, lastLogin: Date.now() });
    res.status(200).json({
      data: { name: user.name, role: user.role },
      accessToken
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ data: users });
};

const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error('user does not exist'));
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) req.body.password = await hashPassword(req.body.password);
    const update = req.body;
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, update);
    res.status(200).json({
      data: user,
      msg: 'user has been updated'
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      msg: 'User has been deleted'
    });
  } catch (error) {
    next(error);
  }
};

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      console.log(req.body);
      const role = req.body.role;
      const permission = roleController.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({ msg: 'Action denied, check your permissions' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({ error: 'You need to be logged in to acces this route' });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// export authentication = {} ??
export default {
  signup,
  login,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  grantAccess,
  allowIfLoggedin
};
