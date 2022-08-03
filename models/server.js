//servidor de express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de socket
    //configura el server
    this.io = socketio(this.server, {
      /*Confuguraciones* */
    });
  }

 
  middlewares() {
    //desplegar publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configurarSockets(){
        new Sockets(this.io);
  }


  execute() {
    //inicializar Middlewares
    this.middlewares();

    //inicializar sockets
    this.configurarSockets();

    //inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto: ", this.port);
    });
  }

}

module.exports = Server;