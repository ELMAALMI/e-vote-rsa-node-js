const { VotePage } = require('./VoteController');
const { initUsers, signup, logOut } = require('./AuthController');
module.exports = {
    VotePage,
    initUsers,
    signup,
    logOut
};
