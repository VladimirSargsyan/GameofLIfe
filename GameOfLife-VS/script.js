function matrixGenerator(matrixSize,grass,grassEater,predator,jur,gardener) {
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



    return matrix
}

var matrix = matrixGenerator(30,40,15,8,10,10)
var side = 19
//

var grassArr = []
var grassEaterArr = []
var predatorArr = [] 
var jurArr = [] 
var gardenerArr = [] 




function setup() {
    frameRate(15)
    createCanvas(matrix[0].length * side ,matrix.length * side)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

       
           if(matrix[y][x] == 1){
                var gr = new Grass(x,y)
                grassArr.push(gr)

           }
           else  if(matrix[y][x] == 2){
            var grEat = new GrassEater(x,y)
            grassEaterArr.push(grEat)

           }
           else if(matrix[y][x] == 3){
            var pred = new Predator(x,y)
                predatorArr.push(pred)
            }
            else if(matrix[y][x] == 4){
            var jur = new Jur(x,y)
            jurArr.push(jur)

            }
            else if (matrix[y][x] == 5){
             var gardener = new Gardener(x,y)
               gardenerArr.push(gardener)
            }
                  
           }
       }
   }
     



function draw() {
    
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

      for(let i in  grassArr){
            grassArr[i].mul()
     }

      for(let i in  grassEaterArr){
        grassEaterArr[i].eat()
        
  }



     for(let i in predatorArr){
         predatorArr[i].mul()
         predatorArr[i].eat()
        

     }

     for (let i in jurArr) {
        jurArr[i].mul()
        jurArr[i].eat()
     }

     for (let i in gardenerArr) {
        gardenerArr[i].mul()
        gardenerArr[i].eat()
     }
  
}
