const Role = require('../models/role');
const Usuario = require('../models/usuario');
const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const esEmailValido = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`)
    }
}

const esIdValido = async(id = '') => {
    const existeId = await Usuario.findById(id);
    if ( !existeId ) {
        throw new Error(`El ID ${id} no está registrado en la BD`)
    }
}

module.exports = {
    esRolValido,
    esEmailValido,
    esIdValido
}