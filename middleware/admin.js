// module.exports = function(req, res, next) {
//     if (req.user.isAdmin === true){
//         return res.status(200).send("Welcome, Admin")
//     } else {
//     return res.status(404).send("Access Denied")
//     }
// }

module.exports = function(req, res, next) {
    // 401 Unauthorized
    // 403 Forbidden
  
    if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  
    next();
  }; 