const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';
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
        this.app.use(this.usersRoutePath, require('../routes/user'))
    }
    start() {
        this.app.listen(this.port, () => {
            console.log('aplicacion corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;
