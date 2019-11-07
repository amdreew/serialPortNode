require('../config/config');
const URL = '/home/mrroot/Documentos/npm/serialPortNode/view/';
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);


io.on('connection', (socket) => {
    console.log(`nuevo cliente conectado`);
});

app.get('/', (req, res, next) =>{
    res.sendFile(`${URL}index.html`);    
});

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const parser = new ReadLine();
const mySerial = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
});

mySerial.on('open',() => {
    console.log(`la conexion serial ha sido abierta`)

})

mySerial.on('data', (data) => {
    //console.log(data.toString());
    io.emit('arduino:data', {
        value: data.toString()
    });    
});

mySerial.on('err', (err) => {
    console.log(err.message);
})

server.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});