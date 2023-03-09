const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                password: 'abc',
                img,
                google: true,
                rol: 'USER_ROLE'
            };
            usuario = new Usuario( data );
            await usuario.save();
        }
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador'
            })
        }
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })  

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


}
module.exports = {
    login,
    googleSignIn
}