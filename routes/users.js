const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { verificationUserData } = require('../utils/celebrateVerification');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserInfo);

//  обновляет информацию о пользователе (email и имя)
router.patch('/me', verificationUserData, updateUserInfo);

module.exports = router;
