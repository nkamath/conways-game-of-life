var gridHeight = 29;
var gridWidth = 29;
var theGrid = createArray((gridHeight+2),(gridWidth+2));
var tempGrid = createArray(gridHeight+2,gridWidth+2);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#00FF00";


function startGame(){
	fillRandom(); //create the starting state for grid 
	tick();
}

function tick() { //main loop
	console.time("gameOfLife");
	drawGrid();
	theGrid = updateGrid(theGrid,gridHeight, gridWidth);
	console.timeEnd("gameOfLife");
	requestAnimationFrame(tick);
}

function createArray(rows,cols) {
	var arr = [];
	for (let i = 0; i < rows; i++) {
	arr[i] = [];
	for (let j = 0; j < cols; j++) {
		arr[i][j] = 0;
	}
	}
	return arr;
}

function fillRandom() { //initialize the grid values
	for (var j = 1; j < gridHeight+1; j++) {
		for (var k = 1; k < gridWidth+1; k++) {
			theGrid[j][k] = Math.round(Math.random());
		}
	}
}

function drawGrid() { //draw the contents of the grid onto a canvas
	ctx.clearRect(0, 0, (gridHeight+2)*10, (gridWidth+2)*10); //clearing canvas before each draw
	for (var j = 0; j < gridHeight+2; j++) {
		for (var k = 0; k < gridWidth+2; k++) {
			if (theGrid[j][k] === 1) {
				ctx.fillRect(j*10, k*10, 10, 10);                  
			}
		}
	}
}

function updateGrid(theGrid, gridHeight, gridWidth) { //perform one iteration of grid update   
	for (var j = 1; j < gridHeight+1; j++) {
		for (var k = 1; k < gridWidth+1; k++) { 
		
			//check surrounding cells of each game cell in the grid
			var totalCells = 0;
			for (var l = -1; l <=1; l++){
			for(var m = -1; m <=1; m++){
				totalCells += theGrid[j+l][k+m];
			}
			}
			// Make sure to not double count the value of cell
			totalCells -= theGrid[j][k];
		
			//apply the rules to each cell
			switch (totalCells) {
				case 2:
					tempGrid[j][k] = theGrid[j][k]; 
					break;
				case 3:
					tempGrid[j][k] = 1; 
					break;
				default:
					tempGrid[j][k] = 0;
			}
		}
	}

	//swap grids
	var temp = theGrid;
	theGrid = tempGrid;
	tempGrid = temp;
	return theGrid;
}

// Tests

function runTest(){
	var testGridHeight = 5;
	var testGridWidth = 5;
	var testGrid = createArray((testGridHeight+2),(testGridWidth+2));
	testGrid =  [[0,0,0,0,0,0,0],
				[0,0,1,0,0,0,0],
				[0,1,1,0,0,1,0],
				[0,0,1,0,0,1,0],
				[0,1,1,1,0,1,0],
				[0,0,1,0,0,1,0],
				[0,0,0,0,0,0,0]]

	testGrid = updateGrid(testGrid,testGridHeight, testGridWidth);

	console.log("Tests Started"); 
	// A cell switches from DEAD to ALIVE if its surrounded exactly by 3 living cells.
	console.assert(testGrid[1][1]===1);

	// A cell remains alive if its surrounded by 2 or 3 living cells.
	console.assert(testGrid[3][5]===1);

	// A cell switches from being ALIVE to DEAD if its surrounded by more than 3 living cells because of over population.
	console.assert(testGrid[4][2]===0);

	// A cell switches from being ALIVE to DEAD if its surrounded by less than 2 cells because of under population.
	console.assert(testGrid[5][5]===0);
	console.log("Tests Complete. Fail if asserts caught, pass if clean."); 
}


