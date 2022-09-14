const { Condidate } = require('../model');

exports.CondidateHomePage = async (req, res) => {
    let condidates = await Condidate.find().lean();
    return res.render('condidate', { condidates });
};

exports.NewCondidate = (req, res) => {
    return res.render('new_condidate');
};

exports.SaveCondidate = async (req, res) => {
    console.log(req.body);
    await Condidate.create(req.body);
    return res.redirect('/condidates');
};
