const jwt = require('jsonwebtoken');
const UserModel = require('../schema/auth.schema');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("TOKEN",token,"TOKEN")
        if (!token) return res.status(400).json({ message: 'User not Authenticate!', status: false });
        const decodeToken = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decodeToken) return res.status(400).json({ message: 'User not Authenticate', status: false });
        const findUser = await UserModel.findById(decodeToken.id)
        if(findUser){
            req.user_id = decodeToken.id;
            return next()
        }
        
        return res.status(400).json({message : 'User not Found !',status : false})
    } catch (error) {
        return res.status(400).json({ message: error.message, status: false })

    }

}

module.exports = authMiddleware;