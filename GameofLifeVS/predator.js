let LivingCreature = require("./LivingCreature")

module.exports = class Predator extends LivingCreature{
    constructor(x,y){
              super(x,y)
              this.energy = 12
              this.multiply = 1
              this.directions = []
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
  chooseCell(char,char1) {
      this.getNewCoordinates();
      let found = [];

      for (let i in this.directions) {
          let x = this.directions[i][0];
          let y = this.directions[i][1];

          if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
              if (matrix[y][x] == char) {
                  found.push(this.directions[i]);
              }
          }

          if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
              if (matrix[y][x] == char1) {
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
      this.multiply++
      let emptyCell = this.chooseCell(0);
      let newCell = random(emptyCell)
 
      if (newCell && this.energy > 15) {
          let newX = newCell[0];
          let newY = newCell[1];

          let pred = new Predator(newX, newY);
          matrix[newY][newX] = 3;
         predatorArr.push(pred);
         this.multiply = 1

          this.energy = 12;
      }
  }


  eat() {
      let emptyCell = this.chooseCell(1,2,4);
      let newCell = random(emptyCell)

      if (newCell) {
          this.energy += 5;
          let newX = newCell[0];
          let newY = newCell[1];

          for (let i = 0; i < grassArr.length; i++) {
              if (grassArr[i].x == newX && grassArr[i].y == newY) {
                  grassArr.splice(i, 1)
                  break;
              }
          }

          for (let i = 0; i < jurArr.length; i++) {
            if (jurArr[i].x == newX && jurArr[i].y == newY) {
                jurArr.splice(i, 1)
                break;
            }
        }

          matrix[newY][newX] = 3;
          matrix[this.y][this.x] = 0;

          this.x = newX;
          this.y = newY;

          if (this.energy > 30) {
              this.mul()
          }
      } 
      
      
      
      else {
          this.move()
      }
  }

  move() {
      this.energy--
      let emptyCell = this.chooseCell(0);
      let newCell = random(emptyCell)

      if (newCell) {
          let newX = newCell[0];
          let newY = newCell[1];

          matrix[newY][newX] = 3;
          matrix[this.y][this.x] = 0;

         
          this.x = newX;
          this.y = newY;
         

          if (this.energy < 0) {
              this.die()
          }
      } 
  }

  die() {
      for (let i = 0; i < predatorArr.length; i++) {
          if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
             predatorArr.splice(i, 1)
          }
      }
      matrix[this.y][this.x] = 0;
  }
}