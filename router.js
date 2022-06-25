const express = require('express');
const router = express.Router();
const { VotePage, logOut } = require('./src/controller');
const { signup } = require('./src/controller');
const { authMiddleware } = require('./src/middleware/auth');

// app routes
router.get('/', (req, res) => res.render('index'));
router.get('/403', (req, res) => res.render('403'));
router.get('/vote/:token', VotePage);
//admin & CO & CA routes

router.get('/dash', authMiddleware, (req, res) => res.render('dash'));

//users routes
router.get('/login', (req, res) => res.render('login'));
router.post('/login', signup);
router.get('/logout', logOut);
// not foud route
router.get('**', (req, res) => res.render('404'));

module.exports = router;
