const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req,res,next) => {
try{

   
const token = req.header('Authorization').replace("Bearer ","")

console.log(token)

const decoded = jwt.verify(token,process.env.JWT_TOKEN)
const user = await User.findOne({ _id: decoded.id,'tokens.token':token})
// console.log(token)

if(!user)
{
    throw Error()
}
req.token = token
req.user = user 
next()

}
catch(err)
{
    console.log(err)
    res.status(401).send({error:"Please Authenticate."})
}
}

module.exports = auth