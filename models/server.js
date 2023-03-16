const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categorias: '/api/categorias',
            productos: '/api/productos'
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
    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.users, require('../routes/user'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
    }
    start() {
        this.app.listen(this.port, () => {
            console.log('aplicacion corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;
