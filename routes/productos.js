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
const { existeProducto } = require('../helpers/productos-validators');
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
router.get('/:id',[
    check('id').custom( existeProducto ), 
    validarCampos
], obtenerUnProducto);


// ACTUALIZAR
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeProducto ),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], actualizarProducto);

// BORRAR
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeProducto ),
    tieneRole('ADMIN_ROLE'),
    validarCampos
], borrarProducto);

module.exports = router;