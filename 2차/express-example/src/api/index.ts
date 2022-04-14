import express, { Router } from 'express';

const router: Router = express.Router();

router.use('/user', require('./user'));
router.use('/blog', require('./blog'));
router.use('/signup', require('./signup'));
router.use('/like', require('./like'));

module.exports = router; // 모듈로 반환
