const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validarCampos } = require("../middlewares")

const { existeUsuarioPorId } = require('../helpers/dbValidate');

const { getLocations } = require('../controllers/geo');
const { getUser, putUser, patchUser, deleteUser, postUser } = require('../controllers/user');



const router = Router();

router.get('/',[validateJWT],getUser);

router.post('/',[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password no es valido').isLength({ min:6}),
    validarCampos
    ],postUser);

router.put('/:id',[
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],putUser);

router.patch('/',[validateJWT],patchUser);

router.delete('/:id',
[   validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],deleteUser);

router.post('/sendAddress',
[validateJWT],
getLocations);

module.exports = router;