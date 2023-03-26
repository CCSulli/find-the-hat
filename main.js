const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    // Set the "home" position before the game starts
    this.field[0][0] = pathCharacter;
  }

  // Creates game loop
  play() {
    let gameState = true;
    while (gameState) {
      this.print();
      this.askQuestion();
      if (
        this.locationX < 0 ||
        this.locationX >= this.field[0].length ||
        this.locationY < 0 ||
        this.locationY >= this.field.length
      ) {
        console.log("Out of bounds!");
        gameState = false;
        return;
      } else if (this.field[this.locationY][this.locationX] === hat) {
        console.log("You win!");
        gameState = false;
        return;
      } else if (this.field[this.locationY][this.locationX] === hole) {
        console.log("You fell down a hole!");
        gameState = false;
        return;
      }
      // Update the current location on the map
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  // Shows field.
  print() {
    const displayString = this.field.map(row => {
        return row.join('');
      }).join('\n');
    console.log(displayString);
  }

  //Ask for input
  askQuestion() {
    const move = prompt("Which way (u,d,l,r)? ").toUpperCase();
    if (move === "R") {
      this.locationX += 1;
    } else if (move === "L") {
      this.locationX -= 1;
    } else if (move === "U") {
      this.locationY -= 1;
    } else if (move === "D") {
      this.locationY += 1;
    } else {
      console.log("Please enter the U, D, L, or R key.");
    }
  }

  static generateField(height, width, percent) {
    const holeNum = (height * width) * percent;
    const field = [];
    for (let i = 0; i < height; i++) {
      field.push([]);
      for (let j = 0; j < width; j++) {
        field[i].push(fieldCharacter);
      }
    }
    for (let i = 0; i < holeNum; i++) {
      const randomCol = Math.floor(Math.random() * height);
      const randomRow = Math.floor(Math.random() * width);
      field[randomCol][randomRow] = hole;
    }

    let randomCol = Math.floor(Math.random() * height);
    let randomRow = Math.floor(Math.random() * width);
    
    while (randomCol === 0 && randomRow === 0) {
         randomCol = Math.floor(Math.random() * height);
         randomRow = Math.floor(Math.random() * width);
    }
    field[randomCol][randomRow] = hat;
    return field;
  }
}

const myField = new Field(Field.generateField(10, 10, .2));
myField.play();
