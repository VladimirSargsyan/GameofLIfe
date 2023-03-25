let LivingCreature = require("./LivingCreature")

module.exports = class Gardener extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 4;
        this.multiply = 1;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates()
      
        return super.chooseCell(char)
    }

    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
        }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        console.log(emptyCells);
        if (newCell && this.multiply >=38) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var gard = new Gardener(newX, newY);
            gardenerArr.push(gard);
            this.multiply = 1;

            this.energy = 4;
        }
    }

    move() {
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell)
        
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;

           
            this.x = newX;
            this.y = newY;

            this.energy--


            if (this.energy < 0) {
                this.die()
            }
        } 
    }


    eat() {
        let emptyCell = this.chooseCell(2);
        let newCell = random(emptyCell)
  
        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];
  
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
  
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
  
            this.x = newX;
            this.y = newY;
  
            if (this.energy > 20) {
                this.mul()
            }
        } 
        
        
        
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in gardenerArr) {
            if (this.x == gardenerArr[i].x && this.y == gardenerArr[i].y) {
                gardenerArr.splice(i, 1);
                break;
            }
        }
    }


}