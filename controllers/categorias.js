const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate (que es?) (populate va a dar la información del usuario)
const obtenerCategorias = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ]);
    res.json({
        total,
        categorias
    });
  }


// obtenerCategoria - se devuelve una sola categoria
const obtenerUnaCategoria = async(req, res=response) => {
    console.log('Obteniendo categoria')
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria);
}



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
    crearCategoria,
    obtenerUnaCategoria,
    obtenerCategorias
}