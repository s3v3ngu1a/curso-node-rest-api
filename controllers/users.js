const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usersGet = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
  }

const usersPost = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    // hash password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // guardar
    await usuario.save();
    res.json({
        msg: 'post API - controlador',
        usuario
    });
  }

const usersPut = async(req, res = response) => {
    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario);
  }

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    // eliminacion fisica, no recomendada por perdida de integridad referencial
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    res.json(
        usuario
    );
  }

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}