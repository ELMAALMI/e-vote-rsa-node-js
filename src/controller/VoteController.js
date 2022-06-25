exports.VotePage = (req, res) => {
    const { token } = req.params;
    console.log(token);
    const condidates = [
        {
            name: 'Billal',
            _id: 'dfgyusdjflskdjfl545465'
        },
        {
            name: 'Hind',
            _id: 'dfgyu88sdjflskdjfl545465'
        },
        {
            name: 'Reda',
            _id: 'dfgyusdjflskdjfl545465'
        }
    ];
    return res.render('vote', { condidates });
};
