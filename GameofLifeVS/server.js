var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs'); 

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('home.html');
});
app.get('/home', function (req, res) {
    res.redirect('/home.html');
});


server.listen(3003);

function matrixGenerator(matrixSize, grass, grassEater, predator, jur, gardener) {
    var matrix = []

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)

        }
    }


    for (let i = 0; i < grass; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 1

    }

    for (let i = 0; i < grassEater; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 2

    }



    for (let i = 0; i < predator; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 3


    }


    for (let i = 0; i < jur; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4


    }
    for (let i = 0; i < gardener; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 5


    }

    io.emit("sendmatrix",matrix)

    return matrix
}

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
    io.emit("sendmatrix", matrix)

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

    io.emit("sendmatrix", matrix)
}

let i = setInterval(gameMove, 300)

var weather;

function Spring() {
    clearInterval(i)
    setInterval(gameMove, 300)
    weather = "spring";
    io.sockets.emit('Spring', weather);
}

function Summer() {
    clearInterval(i)
    setInterval(gameMove, 500)
    weather = "summer";
    io.sockets.emit('Summer', weather);
}

function Autumn() {
    clearInterval(i)
    setInterval(gameMove, 700)
    weather = "autumn";
    io.sockets.emit('Autumn', weather);
}

function Winter() {
    clearInterval(i)
    setInterval(gameMove, 1000)
    weather = "winter";
    io.sockets.emit('Winter', weather);
}

function alldatas() {
    countd = {
        grass: grassArr.length,
        grassEater: grassEaterArr.length,
        predator: predatorArr.length,
        jur: jurArr.length,
        gardener: gardenerArr.length

    }
    fs.writeFile("state.json", JSON.stringify(countd), function () {
        io.emit("send datas", countd)
    })

}

function addChar(n) {


    let x = Math.floor(Math.random() * 30)
    let y = Math.floor(Math.random() * 30)
    matrix[y][x] = n
    if (n == 1) {
        var gr = new Grass(x, y)
        grassArr.push(gr)
    }
    else if (n == 2) {
        var grEat = new GrassEater(x, y)
        grassEaterArr.push(grEat)
    }
    else if (n == 3) {
        var pred = new Predator(x, y)
        predatorArr.push(pred)
    }else if (n == 4) {
       
        var jur = new Jur(x, y)
                jurArr.push(jur)
       
    }else if (n == 5) {
        var gardener = new Gardener(x, y)
        gardenerArr.push(gardener)
    }
    
}
io.on('connection', function (socket) {

        socket.on("send button", addChar);
    })
    
setInterval(alldatas, 300);