module.exports = function(req, res, next) {
    if(!req.user.isAdmin) return res.status(404).send("Access Denied")

    next();
}