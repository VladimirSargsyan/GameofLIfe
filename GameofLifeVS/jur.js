let LivingCreature = require("./LivingCreature")

module.exports = class Jur extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 5;
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

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
        }

    mul() {
        this.multiply--;
        // var emptyCells = this.chooseCell(0);
        let newCell = this.random(0)      

        // console.log(emptyCells);
        if (newCell && this.multiply >= 38) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var jur = new Jur(newX, newY);
            jurArr.push(jur);
            this.multiply = 1;

            this.energy = 5;
        }
    }

    move() {
        // let emptyCell = this.chooseCell(0);
        let newCell = this.random(0)
  
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
  
            matrix[newY][newX] = 4;
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
        // let emptyCell = this.chooseCell(3);
        let newCell = this.random(3)
  
        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];
  
            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
  
            matrix[newY][newX] = 4;
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
        for (var i in jurArr) {
            if (this.x == jurArr[i].x && this.y == jurArr[i].y) {
                jurArr.splice(i, 1);
                break;
            }
        }
    }
}