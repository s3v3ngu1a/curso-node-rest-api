const { Router } = require('express');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');
const { check } = require('express-validator');

const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares');

const {esRolValido, esEmailValido, esIdValido} = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password de tener más de 6 caracteres').isLength({ min:6 }),
    check('correo', 'El correo no es válido').isEmail().custom(esEmailValido),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usersPost);
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(esIdValido),
    check('rol').custom(esRolValido),
    validarCampos
], usersPut);

router.patch('/',usersPatch);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(esIdValido),
    validarCampos
],usersDelete);

module.exports = router;