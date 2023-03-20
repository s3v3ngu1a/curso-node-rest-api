const { response } = require('express');
const { subirArchivo } = require('../helpers');


const cargarArchivo = async (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }
  try {
    const nombreArchivo = await subirArchivo(req.files, ['txt', 'csv'], carpeta='textos')
    res.json({ msg: `archivos subidos: ${nombreArchivo}` })
  } catch (msg) {
    res.status(400).json(msg);
  }

}

const actualizarImagen = async(req, res=response) => {
  const {coleccion, id} = req.params;
  res.json({coleccion, id})
}

module.exports = {
  cargarArchivo,
  actualizarImagen
}