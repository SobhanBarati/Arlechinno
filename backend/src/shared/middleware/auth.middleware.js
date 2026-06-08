import jwt from 'jsonwebtoken';

export const authMiddleware = ( req , res , next ) => {
    try {
        const authHeader = req.header.authorization;

        if(!authHeader){
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );

        req.user = decoded ;

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token.",
        });
    }
};