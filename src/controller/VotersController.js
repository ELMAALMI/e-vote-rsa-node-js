const { Voter } = require('../model');
const openpgpUtil = require('../utils/opengpUtil');
exports.SaveVoterVote = async (req, res) => {
    let voter = await Voter.findOne({
        email: req.body.email
    });
    if (!voter.token.valid) {
        return res.redirect('/403');
    }
    voter.condidate = openpgpUtil.encrypt(req.body.condidate);
    voter.token.valid = false;
    await voter.save();
    return res.redirect('/done');
};
