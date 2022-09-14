const { User, Voter } = require('../model');

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
const makeId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

exports.initVoters = async () => {
    const voters = [];
    for (let i = 0; i < 20; i++) {
        voters.push({
            l_name: 'EL MAALMI_' + i,
            f_name: 'BILLAL_' + i,
            email: 'elmaalmibillal@gmail.com',
            birthday: '2000-01-23',
            token: {
                value: makeId(20),
                valid: true
            }
        });
        voters.push({
            l_name: 'BOUSLAMA' + i,
            f_name: 'HIND_' + i,
            email: 'hind.bouslama@gmail.com',
            birthday: '1998-11-23',
            token: {
                value: makeId(20),
                valid: true
            }
        });
        voters.push({
            l_name: 'BAALOU_' + i,
            f_name: 'REDA_' + i,
            email: 'reda.baalou@gmail.com',
            birthday: '1999-01-23',
            token: {
                value: makeId(20),
                valid: true
            }
        });
        voters.push({
            l_name: 'BENJOUD' + i,
            f_name: 'JAD_' + i,
            email: 'benjad.jad@gmail.com',
            birthday: '1992-11-10',
            token: {
                value: makeId(20),
                valid: true
            }
        });
    }
    try {
        await Voter.collection.drop();
        await Voter.insertMany(voters);
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
