const { Condidate, Vote, Voter } = require('../model');

exports.VotePage = async (req, res) => {
    try {
        const { token, voteId } = req.params;
        const vote = await Vote.findOne({ _id: voteId }).populate('condidates').lean();
        const voter = await Voter.findOne({ 'token.key': token }).lean();

        console.log(vote, voter);
        if (!vote || !voter) {
            return res.redirect('/404');
        }
        if (!voter?.token.valid) {
            return res.redirect('/403');
        }
        var local = new Date(voter.birthday);
        local.setMinutes(voter.birthday.getMinutes() - voter.birthday.getTimezoneOffset());
        voter.birthday = local.toJSON().slice(0, 10);
        console.log(vote.condidates.lean());
        return res.render('vote', { condidates: vote.condidates.lean(), voter });
    } catch (error) {
        console.log(error.message);
        return res.redirect('/404');
    }
};

exports.VoteHomePage = async (req, res) => {
    let votes = await Vote.find().populate(['voters', 'condidates']).lean();

    return res.render('votes', { votes });
};
exports.NewVote = async (req, res) => {
    let condidates = await Condidate.find().lean();
    return res.render('new_vote', { condidates });
};

exports.SaveVote = async (req, res) => {
    console.log(req.body);

    await Vote.create(req.body);
    return res.redirect('/votes');
};
