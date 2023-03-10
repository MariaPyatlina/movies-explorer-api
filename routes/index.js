const router = require('express').Router();
const movieRoutes = require('./movies');
const userRoutes = require('./users');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../error/notFoundError');
const { messages } = require('../utils/constants');
const {
  verificationSignIn,
  verificationSignUp,
} = require('../utils/celebrateVerification');

router.post('/signin', verificationSignIn, login);
router.post('/signup', verificationSignUp, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use('/*', (req, res, next) => {
  next(new NotFoundError(messages.PAGE_NOT_FOUND_ERROR_MSG));
});

module.exports = router;
