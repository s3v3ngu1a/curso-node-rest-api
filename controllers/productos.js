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


const obtenerUnProducto = async(req, res=response) => {
    const {id} = req.params;
    const categoria = await Producto.findById(id)
    .populate('usuario categoria', 'nombre nombre');
    res.json(categoria);
}

const actualizarProducto = async(req, res=response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})
    .populate('categoria usuario', 'nombre nombre');
    res.json({update: 'OK',
            producto});
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


const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json({
        msg: 'Producto eliminado',
        producto
    });
}


module.exports = {
    crearProducto: crearProducto,
    obtenerUnProducto: obtenerUnProducto,
    obtenerProductos: obtenerProductos,
    actualizarProducto: actualizarProducto,
    borrarProducto: borrarProducto
}