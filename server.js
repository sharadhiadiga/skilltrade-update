const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname));

let users = [
    { id: 1, name: "User   1", profilePic: "assets/user1.png" },
    { id: 2, name: "User   2", profilePic: "assets/user2.png" },
    // Add more users as needed
];

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('send-message', (data) => {
        const user = users.find((user) => user.id === data.to);
        if (user) {
            socket.broadcast.emit('receive-message', {
                from: user,
                message: data.message
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
