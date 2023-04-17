
import Driver from "../models/Driver"

const driverProtect=expressAsyncHandler(async(req,res,next)=>{
    let token
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
try{
     token=req.headers.authorization.split(' ')[1]
    const decoded=jwt.verify(token,'secret')
    req.driver=await Driver.findById(decoded.id).select('-password')
    next()
}catch(error){
    res.status(401)
    throw new Error(`Not Authorized, Token Failed`)
}
}
if(!token){
    res.status(401)
    throw new Error('Not Authorized, no token')
}

})
