const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto, Role } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async(termino='', res = response) => {
    const esMongoID = ObjectId.isValid( termino );
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex}, { correo: regex}],
        $and: [{estado: true}]
        
    });
    res.json({
        results: usuarios
    })
}

const buscarCategorias = async(termino='', res = response) => {
    const esMongoID = ObjectId.isValid( termino );
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const categoria = await Categoria.find({ nombre: regex });
    res.json({
        results: categoria
    })
}

const buscarProductos = async(termino='', res = response) => {
    const esMongoID = ObjectId.isValid( termino );
    if (esMongoID) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({ nombre: regex });
    res.json({
        results: productos
    })
}

const buscarRoles = async(termino='', res = response) => {
    const esMongoID = ObjectId.isValid( termino );
    if (esMongoID) {
        const rol = await Role.findById(termino);
        return res.json({
            results: (rol) ? [rol] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const rol = await Role.find({ rol: regex });
    res.json({
        results: rol
    })
}

const busqueda = (req, res=response) => {
    const { coleccion, termino } = req.params;
    if ( !coleccionesPermitidas.includes(coleccion) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
        break;
        case 'categorias':
            buscarCategorias(termino, res)
        break;
        case 'productos':
            buscarProductos(termino, res)
        break;
        case 'roles':
            buscarRoles(termino, res)
        break;
        default:
            res.status(500).json({
                msg: 'Búsqueda no implementada'
            })
    }

}


module.exports = {
    busqueda
}