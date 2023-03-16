const Producto = require('../models/producto');


const existeProducto = async(id = '') => {
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`No se puede encontrar el producto con el id: ${id}`)
    }
}

module.exports = {
    existeProducto
}