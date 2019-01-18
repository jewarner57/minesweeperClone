function BoardSquare(x, y, isMine, boardSquareSize, boardXPosition, boardYPosition) {

	this.gridX = x;
	this.gridY = y; 
	this.is_A_Mine = isMine;
	this.isRevealed = false;
	this.nearbyMineCount = 0;
	this.squareSize = boardSquareSize;
	this.backgroundColor = 100;
	this.boardX = boardXPosition;
	this.boardY = boardYPosition;
	this.isFlagged = false;
	this.isDetonated = false

	this.display = function() {
		fill(this.backgroundColor);
		noStroke(255);
		rect(this.gridX*this.squareSize, this.gridY*this.squareSize, this.squareSize, this.squareSize);

		if(this.isRevealed && this.nearbyMineCount != 0) {
			fill(0, 255, 0);
			textSize(20);
			text(this.nearbyMineCount, this.gridX*this.squareSize+5, this.gridY*this.squareSize+18)
		}
		else if(this.isDetonated) {
			fill(255, 0, 0);
			textSize(15);
			text('💣', this.gridX*this.squareSize+1, this.gridY*this.squareSize+13.5)
		}

	}

	this.revealSquareOnClick = function() {
		this.backgroundColor = 150;

		if(!this.is_A_Mine) {
			this.isRevealed = true;
			this.nearbyMineCount = checkSurroundingSquaresForMines(this.boardX, this.boardY);

			if(this.nearbyMineCount === 0) {
				revealEmptyTiles(this.boardX, this.boardY)
			}
		}
		else {
			this.backgroundColor = 100
			this.isDetonated = true;
			alert("You Lose");

		}

	} 

	this.revealEmptySquare = function(nearbyMineCount) {
		this.backgroundColor = 150;
		this.isFlagged = false;

		if(!this.is_A_Mine) {
			this.isRevealed = true;
			this.nearbyMineCount = nearbyMineCount
		}
	}

	this.flagSquare = function() {
		if(!this.isRevealed) {
			if(this.isFlagged) {
				this.backgroundColor = 100;
				this.isFlagged = false;

				if(this.is_A_Mine) {
					flaggedMines -= 1;
				}
			}
			else {
				this.backgroundColor = 0;
				this.isFlagged = true;

				if(this.is_A_Mine) {
					flaggedMines += 1;
					console.log(flaggedMines)
				}
			}
		}	
	}
}