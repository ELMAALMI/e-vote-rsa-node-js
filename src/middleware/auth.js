exports.authMiddleware = (req, res, next) => {
    const user = req.session['user'];
    if (!user) {
        return res.redirect('/login');
    }
    console.log('auth middlware');
    next();
};
