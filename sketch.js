
let boardArray = [];
let spacesTestedForEmpty = [];
let mouseButtonPressed;
boardX = 4;
boardY = 4;
//size of each tile
let boardSquareSize = 20;
//number of board squares in one row
let boardWidth = 20;
//number of board squares in one column
let boardHeight = 20;

let mineCount = 60;
let flaggedMines = 0;

function setup() {
  createCanvas(600, 600);
  createBoardSquares();
  placeMines();
}

function draw() {
	background(10);
	
    for(let i = 0; i < boardWidth; i++) {

	  	for(let j = 0; j < boardHeight; j++) {
	  		boardArray[i][j].display();
	  	}
    }

    if(flaggedMines == mineCount) {
    	alert("You Won!")
    }

}

function createBoardSquares() {
  for(let i = 0; i < boardWidth; i++) {
  	boardArray[i] = new Array();

  	for(let j = 0; j < boardHeight; j++) {

  		boardArray[i][j] = new BoardSquare(i+boardX, j+boardY, false, boardSquareSize, i, j);
  	}
  }
}

function placeMines() {
	currentMineCount = 0;

	while(currentMineCount < mineCount) {
		xPos = Math.floor(Math.random()*boardWidth);
		yPos = Math.floor(Math.random()*boardHeight);

		if(boardArray[xPos][yPos].is_A_Mine == false) {
			currentMineCount++;
			boardArray[xPos][yPos].is_A_Mine = true;


			//boardArray[xPos][yPos].backgroundColor = 50;


		} 
  	}
}

function mousePressed() {
	mouseButtonPressed = mouseButton;
}

function mouseReleased() {
	squarePosition = findSquareAtPosition(mouseX, mouseY);

	if(squarePosition && mouseButtonPressed === LEFT && !boardArray[squarePosition.i][squarePosition.j].isFlagged) {
		boardArray[squarePosition.i][squarePosition.j].revealSquareOnClick()
	}

	if(squarePosition && mouseButtonPressed === RIGHT) {
		boardArray[squarePosition.i][squarePosition.j].flagSquare()
	}
}

//returns the BoardSquare's position in the boardArray if present, otherwise returns false
function findSquareAtPosition(x, y) {
	for(let i = 0; i < boardWidth; i++) {

	  	for(let j = 0; j < boardHeight; j++) {

	  		if((x > boardArray[i][j].gridX*boardArray[i][j].squareSize 
	  			&& x < boardArray[i][j].gridX*boardArray[i][j].squareSize+boardArray[i][j].squareSize) 
	  			&& (y > boardArray[i][j].gridY*boardArray[i][j].squareSize 
	  			&& y < boardArray[i][j].gridY*boardArray[i][j].squareSize+boardArray[i][j].squareSize)) {

				return {i, j};
			
			}
	  	}
	}
	return null;
}

//returns number of squares surrounding the parameters that have mines
function checkSurroundingSquaresForMines(squareXPositionOnBoard, squareYPositionOnBoard) {
	let mineCount = 0;

	for(let i = squareXPositionOnBoard-1; i < squareXPositionOnBoard+2; i++) {

		for(let j = squareYPositionOnBoard-1; j < squareYPositionOnBoard+2; j++) {
			if((i >= 0 && j >= 0) && (i < boardWidth && j < boardHeight)) {
				if(boardArray[i][j].is_A_Mine) {
					mineCount++;
				}
			}
		}
	}

	return mineCount;
}

function revealEmptyTiles(squareXPositionOnBoard, squareYPositionOnBoard) {
	let hasBeenCalledByFunction = false;

	for(let i = 0; i < spacesTestedForEmpty.length; i++) {

		if(spacesTestedForEmpty[i][0] == squareXPositionOnBoard && spacesTestedForEmpty[i][1] == squareYPositionOnBoard) {
			hasBeenCalledByFunction = true;
		}
	}

	if(hasBeenCalledByFunction === false) {
		spacesTestedForEmpty.push(Array(squareXPositionOnBoard, squareYPositionOnBoard));

		for(let i = squareXPositionOnBoard-1; i < squareXPositionOnBoard+2; i++) {

			for(let j = squareYPositionOnBoard-1; j < squareYPositionOnBoard+2; j++) {

				if((i >= 0 && j >= 0) && (i < boardWidth && j < boardHeight)) {
					nearbyMineCount = checkSurroundingSquaresForMines(boardArray[i][j].boardX, boardArray[i][j].boardY)
					boardArray[i][j].revealEmptySquare(nearbyMineCount);

					if(nearbyMineCount === 0) {
						revealEmptyTiles(i, j);
					}
				}
			}
		}
	}
}