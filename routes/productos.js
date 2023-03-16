const { Router, request } = require('express');
const { check } = require('express-validator');
const { 
    crearProducto, 
    obtenerUnProducto, 
    obtenerProductos, 
    actualizarProducto, 
    borrarProducto 
    } = require('../controllers/productos');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');
const { existeCategoria } = require('../helpers/categorias-validators');
const router = Router();



// Crear un NUEVO producto - cualquiera que tenga un token valido

// CREAR
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'La categoria es obligatoria').notEmpty(),
    validarCampos
], crearProducto);

// OBTENER TODOS
router.get('/', obtenerProductos);

// OBTENER INDIVIDUAL
router.get('/:id',(request, response) => {
    response.status(200).json({
        id: request.params.id,
        msg: 'llego al get de producto ok'
    })
})
// MODIFICAR
router.get('/:id',[
    check('id').custom( existeCategoria ), 
    validarCampos
], obtenerUnaCategoria);
// MODIFICAR
// ACTUALIZAR
router.put('/:id',(request, response) => {
    response.status(200).json({
        id: request.params.id,
        msg: 'llego al put de producto ok'
    })
})

// BORRAR
router.delete('/:id',(request, response) => {
    response.status(200).json({
        id: request.params.id,
        msg: 'llego al delete de producto ok'
    })
})

module.exports = router;