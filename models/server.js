const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload')
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            users: '/api/users',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads'
        }

        // conectar a la base de datos
        this.conectarDB();
        this.middlewares();
        this.routes();
        
        
    }

    async conectarDB() {
        await dbConnection();
    }
    middlewares() {
        // directorio publico
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        // carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/busqueda'))
        this.app.use(this.paths.users, require('../routes/user'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }
    start() {
        this.app.listen(this.port, () => {
            console.log('aplicacion corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;
