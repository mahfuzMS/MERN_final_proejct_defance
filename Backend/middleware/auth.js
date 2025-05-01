const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

const adminAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Admin access required" });
        }
        next();
    });
};

module.exports = { auth, adminAuth };
