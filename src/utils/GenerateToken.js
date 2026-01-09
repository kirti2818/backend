const jwt = require('jsonwebtoken')


const generateToken = (data)=>{
   const token = jwt.sign(data,process.env.SECRET_KEY,{expiresIn : '1d'})
   return token;
}

module.exports = generateToken