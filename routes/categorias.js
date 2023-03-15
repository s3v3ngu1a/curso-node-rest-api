// add the categories routes

const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerUnaCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');
const { existeCategoria } = require('../helpers/categorias-validators');
const router = Router();

// servicios a implementar:
// obtener todas las categorias - publico (GET)
// obtener 1 categoria en particular - publico (GET)
// crear una nueva categoria - privado para cualquier tipo de usuario (POST)
// actualizar - privado
// borrar una categoria - cambiar el estado - solo usuario admin 

// Obtener TODAS las categorias - HECHO
router.get('/', obtenerCategorias);

// Obtener UNA categoria en particular - HECHO
// hay que hacer una validacion en los middleware para corroborar el id
// existe categoria puede ir en los helpers
router.get('/:id',[
    check('id').custom( existeCategoria ), 
    validarCampos
], obtenerUnaCategoria);

// Crear una NUEVA categoria - cualquiera que tenga un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria);

// MODIFICAR una categoria existente 
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], actualizarCategoria);

// ELIMINAR de forma no persistente una categoria - ADMIN
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeCategoria ),
    tieneRole('ADMIN_ROLE'),
    validarCampos
], borrarCategoria);

module.exports = router;