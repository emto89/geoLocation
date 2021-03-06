const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req = request, res = response, next )=> {

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
 

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
        req.uid = uid ;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'No hay token no valido'
        });
    }
}

module.exports = {
    validateJWT
}
