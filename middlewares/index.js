const validarCampos = require('../middlewares/validar-campos');
const  validateJWT  = require('../middlewares/validate-jwt');

module.exports = {
    ...validarCampos,
    ...validateJWT
}