const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate (que es?) (populate va a dar la información del usuario)
// obtenerCategoria - se devuelve una sola categoria


const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if ( categoriaDB ) {
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

// actualizar categoria - ***

// borrar categoria - borrado no persistente





module.exports = {
    crearCategoria
}