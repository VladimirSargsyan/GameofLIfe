var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

// function matrixGenerator(matrixSize, grass, grassEater, predator, jur, gardener) {
//     var matrix = []

//     for (let i = 0; i < matrixSize; i++) {
//         matrix.push([])
//         for (let j = 0; j < matrixSize; j++) {
//             matrix[i].push(0)

//         }
//     }


//     for (let i = 0; i < grass; i++) {

//         var x = Math.floor(Math.random() * matrixSize)
//         var y = Math.floor(Math.random() * matrixSize)

//         matrix[y][x] = 1

//     }

//     for (let i = 0; i < grassEater; i++) {

//         var x = Math.floor(Math.random() * matrixSize)
//         var y = Math.floor(Math.random() * matrixSize)

//         matrix[y][x] = 2

//     }



//     for (let i = 0; i < predator; i++) {

//         var x = Math.floor(Math.random() * matrixSize)
//         var y = Math.floor(Math.random() * matrixSize)

//         matrix[y][x] = 3


//     }


//     for (let i = 0; i < jur; i++) {

//         var x = Math.floor(Math.random() * matrixSize)
//         var y = Math.floor(Math.random() * matrixSize)

//         matrix[y][x] = 4


//     }
//     for (let i = 0; i < gardener; i++) {

//         var x = Math.floor(Math.random() * matrixSize)
//         var y = Math.floor(Math.random() * matrixSize)

//         matrix[y][x] = 5


//     }
     
//     io.emit("sendmatrix",matrix)
   
//     return matrix
// }

matrix = matrixGenerator(30, 40, 15, 8, 10, 10)

grassArr = []
grassEaterArr = []
predatorArr = []
jurArr = []
gardenerArr = []

const Grass = require("./grass")
const GrassEater = require("./grasseater")
const Predator = require("./predator")
const Jur = require("./jur")
const Gardener = require("./gardener")

function createObj() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {


            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)

            }
            else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)

            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y)
                predatorArr.push(pred)
            }
            else if (matrix[y][x] == 4) {
                var jur = new Jur(x, y)
                jurArr.push(jur)

            }
            else if (matrix[y][x] == 5) {
                var gardener = new Gardener(x, y)
                gardenerArr.push(gardener)
            }

        }
    }
    io.emit("sendmatrix",matrix)

}

createObj()

function gameMove() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
     grassEaterArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].eat()
    }

    for (let i in jurArr) {
        jurArr[i].eat()
    }

    for (let i in gardenerArr) {
        gardenerArr[i].eat()
    }

    io.emit("sendmatrix",matrix)
}

setInterval(gameMove, 1000)

function addGrass() {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.emit("sendmatrix",matrix)
}

function addGrassEater() {
    for (var i = 0; i < 5; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.emit("sendmatrix",matrix)
}

function addPredator() {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            var pr = new Predator(x, y, 3)
            grassPredator.push(pr)
        }
    }
    io.emit("sendmatrix",matrix)
}

function addJur() {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            var jur = new Jur(x, y, 4)
            jurArr.push(jur)
        }
    }
    io.emit("sendmatrix",matrix)
}

function addGardener() {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            var gard = new Gardener(x, y, 5)
            gardenerArr.push(gard)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

var weather = 0;

function Spring(){
    weather = "spring";
    io.sockets.emit('Spring', weather);
}

function Summer(){
    weather = "summer";
    io.sockets.emit('Summer', weather);
}

function Autumn(){
    weather = "autumn";
    io.sockets.emit('Autumn', weather);
}

function Winter(){
    weather = "winter";
    io.sockets.emit('Winter', weather);
}