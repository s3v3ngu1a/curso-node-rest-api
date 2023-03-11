const { response } = require("express");
const { Categoria } = require("../models");
const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if ( !categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${nombre}, ya existe`
        });
    }
    
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria( data );
    await categoria.save();
    res.status(201).json({
        msg: 'Nueva categoria agregada',
        categoria
    });
}

module.exports = {
    crearCategoria
}