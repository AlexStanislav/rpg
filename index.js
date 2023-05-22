const app = require("./api/app")

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})
const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
})

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    const isGM = socket.handshake.auth.isGM;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    socket.isGM = isGM;
    next();
});

io.on("connection", (socket) => {
    console.log(`${socket.username} connected`);

    socket.on("disconnect", () => {
        console.log(`${socket.username} disconnected`);
    })
})