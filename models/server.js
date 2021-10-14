const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioRoutePath = '/api/usuarios';
        this.authPath         = '/api/auth';
        // Conectar a la Base de Datos
        this.conectarBD();
        //  Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
        
    }

    async conectarBD(){
        await dbConnection();
    }
    middlewares(){
        // Directorio publico
        this.app.use(express.static('public'));
        // Lectura y parseo del body
        this.app.use(express.json());
        // Activando cors para evitar rechazo por parte del navegador
        this.app.use(cors());
    }
    
    routes(){

       this.app.use(this.authPath, require('../routes/auth')); 
       this.app.use(this.usuarioRoutePath, require('../routes/user'));

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;