const { Voter, Vote } = require('../model');
const openpgpUtil = require('../utils/opengpUtil');
exports.SaveVoterVote = async (req, res) => {
    try {
        const voter = await Voter.findOne({ 'token.value': req.body.token });

        if (!voter?.token.valid) {
            return res.redirect('/403');
        }

        const vote = await Vote.findById(req.body.voteId);

        vote.voters.push(voter._id);
        await vote.save();

        voter.condidate = await openpgpUtil.encrypt(req.body.condidate);
        voter.token.valid = false;
        await voter.save();
        return res.redirect('/done');
    } catch (error) {
        console.log(error);
    }
};
