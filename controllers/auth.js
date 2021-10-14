const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const { generateJWT } = require("../helpers/generateJWT");

const Usuario = require('../models/user');

const login = async (req = request, res = response) => {

    const { correo, password} = req.body;
    try {
        const usuario = await Usuario.findOne({ correo});
        // verifico que usuario exista
        if(!usuario){
            return res.status(400).json({
                msg:'EL usuario no se encontro en la BD'
            })
        }
        // verifico que el usuario este activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'El usuario no se encuentra activo'
            })
        }
        //  verifico que el password sea correcto
        const validarPassword = bcryptjs.compareSync(password+"", usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg:'El password no es correcto'
            })
        }
        // Generar JWT
        const token = await generateJWT(usuario.id);
       res.status(200).json({
        usuario,
        token
       });
    } catch (error) {
        res.status(500).json({
            msg:'Ocurrio un error en el sistema',
            error
        })
    }
    
}

module.exports = {
    login
}