let grid = [];
let col = 30;
let rows = 25;
let x = 1;
let board = document.getElementById("board");
let isStartSelected = false;
let isTargetSelected = false;
let startId = "14-6";
let targetId = "4-2";
let values = [];
let queue = [];

class Node {
  constructor(id, rowNum, colNum) {
    this.id = id;
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.visited = false;
    this.classType = "unvisited";
    this.mouseDown = false;
    this.previousNode = "";
    this.isShortestPath = false;
  }
}

function createGrid() {
  let tableHTML = "";

  for (let i = 0; i < rows; i++) {
    let currentHTMLRow = `<tr id="row ${i}">`;
    grid.push([]);
    grid[i].push(new Array(col));
    for (let j = 0; j < col; j++) {
      let nodeId = `${i}-${j}`;
      grid[i][j] = new Node(nodeId, i, j);
      currentHTMLRow += `<td id = "${nodeId}"  class="unvisited"></td>`;
    }

    tableHTML += `${currentHTMLRow}</tr>`;
    board.innerHTML = tableHTML;
  }
}



  


function getNode(id) {
  let coordinates = id.split("-");
  let r = parseInt(coordinates[0]);
  let c = parseInt(coordinates[1]);
  return grid[r][c];
}

// function getCoordinate(id){
// 	let coordinates = id.split("-");
//   	let r = parseInt(coordinates[0]);
//   	let c = parseInt(coordinates[1]);
//   	return r,c;
// }

function setEventListners() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      let currentId = `${i}-${j}`;
      let currentElement = document.getElementById(currentId);
	  
      currentElement.addEventListener("click", function () {
        if (!isStartSelected && !isTargetSelected) {
          if (grid[i][j].classType == "wall") {
            currentElement.className = "unvisited";
            grid[i][j].classType = "unvisited";

			console.log(grid[i][j]);
          } else if (grid[i][j].classType == "unvisited") {
            currentElement.className = "wall";
            grid[i][j].classType = "wall";
          } else if (grid[i][j].classType == "start") {
            currentElement.className = "unvisited";
            grid[i][j].classType = "unvisited";
            startId = `${i}-${j}`;
            isStartSelected = true;
          } else if (grid[i][j].classType == "target") {
            currentElement.className = "unvisited";
            grid[i][j].classType = "unvisited";
            isTargetSelected = true;
            targetId = `${i}-${j}`;
          }
        } else if (isStartSelected) {
          if (currentElement.id != targetId) {
            currentElement.className = "start";
            grid[i][j].classType = "start";
            isStartSelected = false;
            startId = currentElement.id;
          }
        } else if (isTargetSelected) {
          if (currentElement.id != startId) {
            currentElement.className = "target";
            grid[i][j].classType = "target";
            isTargetSelected = false;
            targetId = currentElement.id;
          }
        }
      });
    }
  }
}

function setMaze() {
	for (let i = 0; i < rows; i++) {
	  for (let j = 0; j < col; j++) {
		let currentId = `${i}-${j}`;
		let coordinates = currentId.split("-");
		let r = parseInt(coordinates[0]);
 		let c = parseInt(coordinates[1]);
		console.log(r + " " + c);
		console.log(grid[r][c]);
		// let currentElement = document.getElementById(currentId);
		// if (!isStartSelected && !isTargetSelected) {
		// 	console.log(currentElement);
		// }
  
	  }
	}
  }
  
// setMaze();

function setCoordinates() {
  document.getElementById(startId).className = "start";
  document.getElementById(targetId).className = "target";
  grid[14][6].classType = "start";
  grid[4][2].classType = "target";
  grid[3][1].classType = "wall";
}

function breadthFirstSearch(grid, startId, targetId) {
  let queue = [];
  let startPos = getNode(startId);
  let r = startPos.rowNum;
  let c = startPos.colNum;

  queue.push([r, c]);

  while (queue.length) {
    let currentPos = queue.shift();
    let r = currentPos[0];
    let c = currentPos[1];

    if (
      r < 0 ||
      r >= grid.length ||
      c < 0 ||
      c >= grid.length ||
      grid[r][c].visited ||
      grid[r][c].classType === "wall"
    ) {
      continue;
    }

    grid[r][c].visited = true;

    if (grid[r][c].id === targetId) {
      let currentNode = getNode(grid[r][c].previousNode);
      while (currentNode.id !== startId) {
        currentNode.isShortestPath = true;
        currentNode = getNode(currentNode.previousNode);
      }
      break;
    }

    values.push(grid[r][c]);

    if (r !== 0 && !grid[r - 1][c].visited) {
      grid[r - 1][c].previousNode = grid[r][c].id;
      queue.push([r - 1, c]);
    }

    if (r !== grid.length - 1 && !grid[r + 1][c].visited) {
      grid[r + 1][c].previousNode = grid[r][c].id;
      queue.push([r + 1, c]);
    }

    if (c !== 0 && !grid[r][c - 1].visited) {
      grid[r][c - 1].previousNode = grid[r][c].id;
      queue.push([r, c - 1]);
    }

    if (c !== grid.length - 1 && !grid[r][c + 1].visited) {
      grid[r][c + 1].previousNode = grid[r][c].id;
      queue.push([r, c + 1]);
    }
  }
}

function BFSearch() {
  breadthFirstSearch(grid, startId, targetId);
  animate();
}

function animate() {
  for (let i = 0; i < values.length; i++) {
    setTimeout(function () {
      if (values[i].isShortestPath == false && values[i].id != startId) {
        document.getElementById(values[i].id).className = "visited";
      } else if (values[i].isShortestPath == true && values[i].id != startId) {
        document.getElementById(values[i].id).className = "shortest-path";
      }
    }, 25 * i);
  }
}

function clearBoard() {
  window.location.reload();
}

createGrid();
setCoordinates();
setEventListners();
