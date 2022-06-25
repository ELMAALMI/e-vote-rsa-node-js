exports.authMiddleware = (req, res, next) => {
    const user = req.session['user'];
    if (!user) {
        res.redirect('/login');
    }
    next();
};
