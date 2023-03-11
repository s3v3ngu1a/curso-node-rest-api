// add the categories routes

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

// servicios a implementar:
// obtener todas las categorias - publico (GET)
// obtener 1 categoria en particular - publico (GET)
// crear una nueva categoria - privado para cualquier tipo de usuario (POST)
// actualizar - privado
// borrar una categoria - cambiar el estado - solo usuario admin 

router.get('/',( req, res ) => {
    res.json({
        msg: 'Todo OK en el get a /categorias'
    })
});

module.exports = router;