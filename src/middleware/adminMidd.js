exports.adminMiddleware = (req, res, next) => {
    const user = req.session['user'];
    if (!user.is_admin) {
        return res.redirect('/dash');
        // res.redirect('/dash');
    }
    console.log('admin middlware');
    next();
};
