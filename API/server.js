const http = require("http");
const { type } = require("os");
const app = require("./app.js");
require("dotenv").config();


const port = process.env.PORT;

const errorManage = error => {
    const bind = typeof address === 'string' ?  'pipe ' + address : 'port ' + port;
    switch(error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDDRINUSE':
            console.error(bind +  ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorManage);

server.on('listening', () => {
    const address  = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : ' port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);