const Categoria = require('../models/categoria');


const existeCategoria = async(id = '') => {
    console.log('categoria by id requested')
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`No se puede encontrar la categoria con el id: ${id}`)
    }
}

module.exports = {
    existeCategoria
}