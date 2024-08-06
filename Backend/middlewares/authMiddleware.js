const JWT = require("jsonwebtoken");

module.exports = (req,res, next) => {
    try {
        const token = req.cookies["Login-token"];
        if(!token) {
            return res.status(401).json({ message: "You are not authorized to access this route" });
        }
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in authMiddleware" });
    }
}