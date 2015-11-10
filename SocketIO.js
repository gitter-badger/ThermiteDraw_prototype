/**
 * Socket.IO
 *
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group All Rights Reserved.
 */

module.exports = function (app) {
  var debug = require('debug')('ThermiteDraw:server');
  var http  = require('http').Server(app);
  var io    = require('socket.io')(http);

  io.on('connection', function (socket) {
    socket.on("draw", function (data) {
      socket.broadcast.emit("draw", data);
    });

    socket.on("color", function (color) {
      socket.broadcast.emit("color", color);
    });

    socket.on("lineWidth", function (width) {
      socket.broadcast.emit("lineWidth", width);
    });

    socket.on("delete", function () {
      socket.broadcast.emit("delete");
    });
  });

  /**
   * Get port from environment and store in Express.
   */
  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  http.listen(port, function () {});

  io.on('error', onError);
  io.on('listening', onListening);


  /**
   * Normalize a port into a number, string, or false.
   */
  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
      break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
      break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    var addr = io.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  module.exports = app;
};
