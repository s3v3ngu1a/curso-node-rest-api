// Implementar CRUD para producto
const { response } = require("express");
const { Producto } = require("../models");

// obtenerProductos - paginado - total - populate (que es?) (populate va a dar la información del usuario)
const obtenerProductos = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);
    res.json({
        total,
        productos
    });
  }


// obtenerCategoria - se devuelve una sola categoria
const obtenerUnProducto = async(req, res=response) => {
    console.log('Obteniendo categoria')
    const {id} = req.params;
    const categoria = await Producto.findById(id).populate('usuario', 'nombre');
    res.json(categoria);
}

// actualizar categoria - Hecho
const actualizarProducto = async(req, res=response) => {
    console.log('Actualizando categoria')
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    const categoria = await Producto.findByIdAndUpdate(id, data, {new: true});
    res.json({update: 'OK',
            categoria});
}

const crearProducto = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Producto.findOne({ nombre });
    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `El producto ${nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id,
        categoria: req.body.categoria
    }
    const producto = new Producto( data );
    await producto.save();
    res.status(201).json({
        msg: 'Nuevo producto agregado',
        producto
    });
}

// borrar categoria - borrado no persistente

const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json(categoria);
}


module.exports = {
    crearProducto: crearProducto,
    obtenerUnProducto: obtenerUnProducto,
    obtenerProductos: obtenerProductos,
    actualizarProducto: actualizarProducto,
    borrarProducto: borrarProducto
}