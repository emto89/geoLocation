const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' )=>{
 
    return new Promise ( (resolve, reject)=>{
      
        const payload = { uid }; 
        
        jwt.sign( payload , process.env.SECRETORPRIVATEKEY,{ expiresIn: '24H'},(err, token)=>{
             if(err){
                reject('No se pudo generar un token');
             }else{
                resolve(token);
             }
        } 
        )

    })

}

module.exports = {
    generateJWT
}