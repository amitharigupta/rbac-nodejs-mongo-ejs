const { roles } = require('../utils/constants');

module.exports = {
    checkUserIsAuthenticated : async (req, res, next) => {
        try {
            if(req.isAuthenticated()) {
                next();
            } else {
                res.redirect("/auth/login");
            }
        } catch (error) {
            res.redirect("/auth/login");
        }
    },
    checkUserLoggedInIsAdmin: async (req ,res, next) => {
        if(req.user.role === roles.admin) {
            next();
        } else {
            req.flash('warning', 'you are not authorized to see this route');
            res.redirect('/');
        }
    },
    checkUserLoggedInIsModerator: async (req ,res, next) => {
        if(req.user.role === roles.moderator) {
            next();
        } else {
            req.flash('warning', 'you are not authorized to see this route');
            res.redirect('/');
        }
    }
}