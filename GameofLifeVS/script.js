var socket = io()
var side = 20
// var weather = 'summer';

function setup() {
    frameRate(15)
    createCanvas(50 * side ,50 * side)

    
   }


function change(matrix) {
    
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

        
          
                if(matrix[y][x] == 1){
                     fill ("green")
                }else if (matrix[y][x] == 2){
                        fill ("yellow")
                }else if(matrix[y][x] == 3){
                            fill ("red")
                }else if(matrix[y][x] == 4){
                            fill ("blue")
                }else if(matrix[y][x] == 5){
                    fill ("purple")
                 }
                else{
                    fill ("gray")
                }
                rect (x * side , y * side ,side,side)
        }
          
      }

    }

socket.on("sendmatrix",change)


function Spring() {
  socket.emit("spring");
}

function Summer() {
  socket.emit("summer");
}

function Autumn() {
  socket.emit("autumn");
}

function Winter() {
  socket.emit("winter");
}
