const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.post('/login', [
check('correo','EL correo es obligatorio').isEmail(),
check('password','La contraseña es obligatoria').isLength({min:6}),
validarCampos
]
,login);

module.exports = router;