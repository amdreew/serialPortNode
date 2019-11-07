const socket = io();
socket.on('arduino:data', (data) => {
    console.log(data);
})