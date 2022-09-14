const express = require('express');
const router = express.Router();
const { VotePage, logOut } = require('./src/controller');
const { signup } = require('./src/controller');
const {
    CondidateHomePage,
    NewCondidate,
    SaveCondidate
} = require('./src/controller/CondidateController');
const { VoteHomePage, NewVote, SaveVote } = require('./src/controller/VoteController');
const { SaveVoterVote } = require('./src/controller/VotersController');
const { authMiddleware } = require('./src/middleware/auth');

// app routes
router.get('/', (req, res) => res.render('index'));
router.get('/403', (req, res) => res.render('403'));
router.get('/done', (req, res) => res.render('donepage'));
//admin & CO & CA routes

router.get('/dash', (req, res) => res.render('dash', { title: 'My Shop' }));

//votes routers
router.get('/votes', (req, res) => VoteHomePage(req, res));
router.get('/votes/new', (req, res) => NewVote(req, res));
router.post('/votes/save', (req, res) => SaveVote(req, res));

router.get('/vote/:voteId/:token', VotePage);
router.post('/voter/save', SaveVoterVote);

//condidate
router.get('/condidates', (req, res) => CondidateHomePage(req, res));
router.get('/condidates/new', (req, res) => NewCondidate(req, res));
router.post('/condidates/save', (req, res) => SaveCondidate(req, res));

//users routes
router.get('/login', (req, res) => res.render('login'));
router.post('/login', signup);
router.get('/logout', logOut);
// not foud route
router.get('**', (req, res) => res.render('404'));

module.exports = router;
