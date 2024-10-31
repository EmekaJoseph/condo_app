import tokenManager from '../useFxn/tokenManager';

const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        const decoded = tokenManager.verifyToken(token);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
