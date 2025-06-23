const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token
    if(!token)
        return res.status(401).json({
       message: 'Unauthorised to access'
    })

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        res.status(401).json({
            message: 'Token error'
        })
    }
}

module.exports = authMiddleware

