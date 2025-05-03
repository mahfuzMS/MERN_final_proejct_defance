
const User = require("../models/user");
const jwt = require("jsonwebtoken");

 const userAuthVerify = (req, res, next) => {
	const token = req.cookies.token;
	
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error.message);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};


const adminAuth = (req, res, next) => {
    const userId = req.userId;
    const user = User.find(user => user.id === userId);
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ success: false, message: "Unauthorized - admin role required" });
    }
    next();

};

module.exports = { userAuthVerify, adminAuth };
