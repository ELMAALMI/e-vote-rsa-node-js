const { Condidate, Vote, Voter } = require('../model');
const opengpUtil = require('../utils/opengpUtil');
exports.VotePage = async (req, res) => {
    try {
        const { token, voteId } = req.params;
        const vote = await Vote.findOne({ _id: voteId }).populate('condidates');
        const voter = await Voter.findOne({ 'token.value': token });

        if (!vote || !voter) {
            return res.redirect('/404');
        }
        if (!voter?.token.valid) {
            console.log(voter);
            return res.redirect('/403');
        }
        return res.render('vote', { condidates: vote.condidates, voter, token, voteId });
    } catch (error) {
        console.log(error.message);
        return res.redirect('/404');
    }
};

exports.VoteHomePage = async (req, res) => {
    let votes = await Vote.find().populate(['voters', 'condidates']);

    votes.forEach(async (v) => {
        let votes_win = [];
        let condidate;
        v.voters.forEach(async (vo) => {
            const id = await opengpUtil.decrypt(vo.condidate);
            const idx = votes_win.findIndex((item) => item.id === id);
            if (idx != -1) {
                votes_win[idx].nb += 1;
            } else {
                votes_win.push({ id, nb: 1 });
            }
            if (votes_win.length > 1) {
                let mm = Math.max(...votes_win.map((o) => o.nb));
                console.log(mm);
            } else {
                condidate = await Condidate.findOne({ _id: votes_win[0].id });
            }
            v['win'] = condidate?.l_name ?? '-';
            console.log(v['win']);
        });
    });
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

exports.dashBoard = async (req, res) => {
    const { voteId } = req.query;
    const user = req.session['user'];
    console.log(user);

    let voters = [];
    if (!voteId) {
        let condidate = await Vote.find()
            .limit(1)
            .sort([['createdAt', -1]])
            .populate('voters');
        voters = condidate[0].voters;
    } else {
        let condidate = await Vote.findOne({ _id: voteId }).populate('voters');
        voters = condidate.voters;
    }

    if (user.is_admin || user.dep) {
        for (let i = 0; i < voters.length; i++) {
            let cc = await opengpUtil.decrypt(voters[i].condidate);
            let c_d = await Condidate.findById(cc);
            voters[i].condidate = c_d.l_name + ' - ' + c_d.f_name;
        }
    }
    console.log(voters);
    return res.render('dash', { voters });
};
