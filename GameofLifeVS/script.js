var socket = io()
var side = 20

function setup() {
    frameRate(15)
    createCanvas(50 * side ,50 * side)

    
   }
  let ses =["green","yellow","red","blue","purple "]

function Back(color){

 if(color==1){
    scolors =["#e1e96b  ","#ffd966","#fff2cc"]
 }else if(color ==2){
    scolors =["#43ff00","#1a5f02","#d9ead3"]
 }else if(color ==3){
    scolors =["#7c5c00","#ffc210","#fce5cd"]
 }else if(color ==4){
    scolors =["#0087ff","#003564","#cfe2f3"]
 }else if (color ==0) {
       scolors =["green","yellow","red","blue","purple"]
 }
 ses=scolors

 return ses
}

// let ses = Back(1)


function change(matrix) {
    
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

          
          
                if(matrix[y][x] == 1){
                     fill (ses[0])
                }else if (matrix[y][x] == 2){
                        fill (ses[1])
                }else if(matrix[y][x] == 3){
                            fill (ses[2])
                }else if(matrix[y][x] == 4){
                            fill (ses[3])
                }else if(matrix[y][x] == 5){
                    fill (ses[4])
                 }
                else{
                    fill ("gray")
                }
                rect (x * side , y * side ,side,side)
        }
          
      }

    }

socket.on("sendmatrix",change)  


socket.on ("send datas", function(counts){
    
  document.getElementById("grass").innerHTML = "Խոտ   " + counts.grass;
  document.getElementById("grassEater").innerHTML = "Խոտակեր   "   + counts.grassEater;
  document.getElementById("predator").innerHTML = "Գիշատիչ   " + counts.predator;
  document.getElementById("jur").innerHTML = "Բնապահպան   " + counts.jur;
  document.getElementById("gardener").innerHTML = "Որսորդ   " + counts.gardener;
  

 
  
 
})

const ButtonForAddChar = document.getElementsByClassName(" button ")


ButtonForAddChar[0].addEventListener("click", function () {

    socket.emit("send button", 1);
})

ButtonForAddChar[1].addEventListener("click", function () {

    socket.emit("send button", 2);
})

ButtonForAddChar[2].addEventListener("click", function () {

    socket.emit("send button", 3);
})
ButtonForAddChar[3].addEventListener("click", function () {

    socket.emit("send button", 4);
})
ButtonForAddChar[4].addEventListener("click", function () {

  socket.emit("send button", 5);
})


