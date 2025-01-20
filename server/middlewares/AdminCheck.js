import jwt from 'jsonwebtoken';

export default {
    adminCheck: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized: No token provided' 
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
                return res.status(403).json({ 
                    success: false,
                    message: 'Forbidden: You do not have the required permissions' 
                });
            }

            req.user = decoded; // Attach user info to request object
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized: Invalid token' 
            });
        }
    },
}
