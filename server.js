const express = require('express');
const socket = require('socket.io');
const routes = require("./routes");
// calling
var server = express();
var app = express();
// chat server set up 
server.use(express.urlencoded({extended: false}));
server.use(express.json());
// handlebars
// setting up app 
const PORT = 3000;
const PORT2 = process.env.PORT || 3001;

app.use(express.static('public'));

var server1 = server.listen (PORT,function(){   


	console.log("listening for request on Port: " + PORT);

    //socket setup

    var io = socket(server1);

    io.on('connection', function(socket){

        console.log('Client..Connected', socket.id)

            // Handle chat event
        socket.on('chat', function(data){
            // console.log(data);
            io.sockets.emit('chat', data);
        });

        // Handle typing event
        socket.on('typing', function(data){
            socket.broadcast.emit('typing', data);
        });
    });
});

// static file
// app.use(express.static('public'));

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "./views/layouts/main.handlebars"));
// });

//Routes
// =======================================================
app.use(routes);

//starts the server to begin listening
// =======================================================
app.listen(PORT2, function(){
    console.log("listening on port 3001")
});