// IMPORTACOES
const { SerialPort } = require('serialport'); // IMPORTANDO SERIALPORT
const { ReadlineParser } = require('@serialport/parser-readline'); //IMPORTANDO READLINE
const express = require('express');
const socketio = require('socket.io');
const http = require('http');


//CRIAR SERVIDOR
const app = express()
const server = http.createServer(app);
app.use(express.static('.'));
app.get('/', (req, res, next) => {
  res.sendFile('index.html' , { root : __dirname});
  });

server.listen(9999, () => {
    console.log("192.168.10.107:%d", server.address().port)
})


const io = socketio(server)




const porta = new SerialPort({path:"/dev/ttyACM0", baudRate: 9600 }) //CONFIGURANDO PARA COM3 E BAUDRATE

const parser = porta.pipe(new ReadlineParser({ delimiter: '\n' })) //LER O PORT COMO NUMERO
parser.on('data', function(data){
  console.log(data)
  io.emit('serial:data',{
    value: data.toString()
  })
})

