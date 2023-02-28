const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'El token no está presente'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRET);
        const usuario = await Usuario.findById(uid); 
        req.usuario = usuario;
        // verificar el estado del usuario
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existente'
            })
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            })
        }
        next();    
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
    
}

module.exports = {
    validarJWT
}