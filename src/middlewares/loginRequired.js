import jwt from "jsonwebtoken";
import User from "../models/User";

const loginRequired = async (req, res, next) => {
    if(!req.headers.authorization) return res.status(401).json({ message: 'Necessário fazer login para seguir.' });
    const token = req.headers.authorization.split(' ')[1];
    
    try {
        jwt.verify(token, process.env.SECRET);

        const userExists = await User.findOne({ _id: jwt.decode(token).id });
        if(!userExists) return res.status(401).json({ message: 'Necessário fazer login para seguir.' });

        req.userId = jwt.decode(token).id;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Necessário fazer login para seguir.' });
    };
};

export default loginRequired;