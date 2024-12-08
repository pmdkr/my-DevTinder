const adminAuth = (req, res, next) => {
    const accessToken = "xy";
    const isAuthenticated = accessToken === "xyz";


    if (!isAuthenticated) {
        res.status(401).send(" user is not authenticated");
    } else {
        next();
    }


}
module.exports = {
    adminAuth
}