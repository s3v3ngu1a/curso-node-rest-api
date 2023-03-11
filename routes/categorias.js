// add the categories routes

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

// servicios a implementar:
// obtener todas las categorias - publico (GET)
// obtener 1 categoria en particular - publico (GET)
// crear una nueva categoria - privado para cualquier tipo de usuario (POST)
// actualizar - privado
// borrar una categoria - cambiar el estado - solo usuario admin 

// Obtener TODAS las categorias
router.get('/',( req, res ) => {
    res.json({
        msg: 'Todo OK en el get a /categorias'
    })
});

// Obtener UNA categoria en particular
router.get('/:id',( req, res ) => {
    res.json({
        msg: 'Todo OK en el get a /categorias por id'
    })
});

// Crear una NUEVA categoria - cualquiera que tenga un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
],( req, res ) => {
    res.json({
        msg: 'Todo OK en el post a /categorias'
    })
});

// MODIFICAR una categoria existente
router.put('/:id',( req, res ) => {
    res.json({
        msg: 'Todo OK en el put a /categorias'
    })
});

// ELIMINAR de forma no persistente una categoria - ADMIN
router.delete('/:id',( req, res ) => {
    res.json({
        msg: 'Todo OK en el delete a /categorias'
    })
});

module.exports = router;