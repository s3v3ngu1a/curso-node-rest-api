const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const login = async(req, resp = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar si el mail existe
        const usuario = await Usuario.findOne({correo});
        if ( !usuario ) {
            return resp.status(400).json({
                msg : 'Usuario / Contraseña incorrectos - correo'
            });
        }
        // Verificar si el usuario esta activo
        if ( !usuario.estado ) {
            return resp.status(400).json({
                msg : 'Usuario / Contraseña incorrectos - estado: false'
            });
        }
        // Verificar la contraseña
        const validPass = bcryptjs.compareSync(password, usuario.password);
        // Generar el JWT
        const token = await generarJWT(usuario.id);
        return resp.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            msg : 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}