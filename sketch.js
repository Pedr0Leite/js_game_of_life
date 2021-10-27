function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;
let countForHTML = 0;
let tempGrid;
// let timer; //Another way of inserting a counter


function setup() {
  // timer = createP('timer'); //Another way of inserting a counter

  //Area of the game
  createCanvas(800, 400); //creates the game area
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2)); //random 0 or 1 |||| nem Cell(i,j) -> try to use objects instead of flat 2D arrays
    }
  }
}

function draw() {
  background(0);
  // timer.html(countForHTML)  //Another way of inserting a counter
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) {
        fill(255); //color
        stroke(123);
        rect(x, y, resolution, resolution);
      }
    }
  }

  let next = make2DArray(cols, rows); //next gen

  //compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

      //Count live neighors
      let sum = 0;
      let neighors = countNeighors(grid, i, j);

      //First rule - So se reproduz se tiver 3 vizinhos
      if (state == 0 && neighors == 3) {
        next[i][j] = 1;
        //Second rule - Morre se tiver menos de dois e mais de 3
      } else if (state == 1 && (neighors < 2 || neighors > 3)) {
        next[i][j] = 0;
        //third rule
      } else {
        next[i][j] = state;
      }
    }
  }
  countForHTML++;
  document.getElementsByName("smname")[0].value = countForHTML;

  if (countForHTML % 2 == 0) {
    tempGrid = grid;
  }

  if(JSON.stringify(next) === JSON.stringify(tempGrid)){
      noLoop();
  }
  console.log(JSON.stringify(next) === JSON.stringify(tempGrid))
  grid = next;
}

function countNeighors(grid, x, y) {
  let sum = 0;
  //Code does the same as:
  // sum += grid[i - 1][j - 1];
  // sum += grid[i + 1][j + 1];
  // sum += grid[i - 1][j + 1];
  // sum += grid[i + 1][j - 1];
  // sum += grid[i][j - 1];
  // sum += grid[i - 1][j];
  // sum += grid[i + 1][j];
  // sum += grid[i][j + 1];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
