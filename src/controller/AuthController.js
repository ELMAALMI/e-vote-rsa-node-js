const { User } = require('../model');

exports.initUsers = async () => {
    const users = [
        {
            name: 'admin',
            email: 'admin@e-vote.com',
            password: '123456789'
        },
        {
            name: 'comptage',
            email: 'comptage@e-vote.com',
            password: '123456789'
        },
        {
            name: 'depouillement',
            email: 'depouillement@e-vote.com',
            password: '123456789'
        }
    ];
    try {
        await User.collection.drop();
        users.forEach(async (item) => {
            const user = new User(item);
            await user.save();
        });
    } catch (e) {
        console.log(e);
    }
};
exports.signup = async (req, res) => {
    try {
        const { login, password } = req.body;
        const message = 'password or email incorrect';
        if (login === null || login === '' || password === null || password === '') {
            return res.redirect(`/login?message=${message}val`);
        }

        const user = await User.findOne({ email: login });
        // console.log(user, user.authenticate());
        if (!user) {
            return res.redirect(`/login?message=${message}not`);
        }
        if (!user.authenticate(password)) {
            return res.redirect(`/login?message=${message}pwd`);
        }
        delete user._password;
        req.session['user'] = user;
        return res.redirect('/dash');
    } catch (e) {
        console.log(e);
    }
};
exports.logOut = (req, res) => {
    req.session.destroy();
    return res.redirect('/login');
};
