const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async(termino='', res = response) => {
    const esMongoID = ObjectId.isValid( termino );
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario] : []
        })
    }
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
        case 'categoria':

        break;
        case 'productos':

        break;
        case 'roles':

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