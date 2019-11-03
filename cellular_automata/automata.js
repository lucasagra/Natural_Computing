let rows = 50;
let cols = 150;
let rules = [[1,1,1], [1,1,0], [1,0,1], [1,0,0], [1,1,0], [0,1,0], [0,0,1], [0,0,0]]
let size = 5;

let matrix = [];
for (let i = 0; i < rows; i++) {
    matrix.push(new Array(cols).fill(0));
}
matrix[rows - 1][cols / 2] = 1;

let selectOptions = document.getElementById("inputGroupSelect01");
for(let i = 0; i < 256; i++) {
    let option = document.createElement('option');
    option.text = i;
    selectOptions.add(option);
}

function checkRule(rule, arr, x) {
    x += cols
    if(arr[(x-1)%cols] != rule[0]) return false;
    if(arr[x%cols] != rule[1]) return false;
    if(arr[(x+1)%cols] != rule[2]) return false;
    return true;
}

function nextStage(arr, ruleset) {
    let newArr = new Array(arr.length).fill(0);

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < ruleset.length; j++) {
            if(checkRule(ruleset[j], arr, i)) {
                newArr[i] = 1;
                break;
            }
        }
    }

    return newArr;
}

function dec2bin(dec) {
    ruleset = []
    str = (dec >>> 0).toString(2);

    for(let i = 0; i < str.length; i++){
        if(str[i] == '1') {
            ruleset.push(rules[8 - str.length + i])
        }
    }

    return ruleset;
}

function selectEvent(value) {
    ruleset = dec2bin(value);
}

function windowResized() {
    resizeCanvas(cols * size + 2, rows * size + 2);
}

function reset() {
    matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push(new Array(cols).fill(0));
    }
    matrix[rows - 1][cols / 2] = 1;

    console.log(ruleset);
}

function setup() {

    let ruleset = dec2bin(0);
    frameRate(10);
    size = (windowWidth / (cols * 2));
    createCanvas(cols * size + 2, rows * size + 2).style('display', 'block').style('margin', 'auto').parent('canvas');
}

function drawMatrix(matrix, size) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] == 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(1 + j*size, 1 + i*size, size, size);
        }
    }
}

function draw() {
    background(255);
    drawMatrix(matrix, size);
    matrix.shift(1);
    matrix.push(nextStage(matrix[matrix.length-1], ruleset));
    size = (windowWidth/(cols*2));
}

