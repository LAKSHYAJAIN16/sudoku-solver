//Null char
const o = null;

//Some example boards
const bd1 = [[1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9]]

const bd2 = [[1, 2, 3, 4, 5, 6, 7, 8, o],
            [o, o, o, o, o, o, o, o, 1],
            [o, o, o, o, o, o, o, o, 2],
            [o, o, o, o, o, o, o, o, 3],    
            [o, o, o, o, o, o, o, o, 4],
            [o, o, o, o, o, o, o, o, 5],
            [o, o, o, o, o, o, o, o, 6],
            [o, o, o, o, o, o, o, o, 7],
            [o, o, o, o, o, o, o, o, 8]]

function init(){
    let startingBoard = [[]]
    let j = 0
    for (var i = 1; i <= 81; i++){
        const val = document.getElementById(String(i)).value
        if (val == ""){
            startingBoard[j].push(null)
        }
        else { 
            startingBoard[j].push(Number(val))
        }
        if (i % 9 == 0 && i < 81){
            startingBoard.push([])
            j++
        }
    }
    const is_allowed = validBoard(startingBoard);
    if(!is_allowed){
        alert("Dude that board isn't valid what m8");
        return;
    }

    const solution = solve(startingBoard);
    updateBoard(solution);
}

//The Main Solve function
function solve(board)
{
    if(isSolved(board)){
        return board;
    }
    else{
        const possibilities = nextSquares(board);
        const good = keepOnlyValid(possibilities);
        const solution = searchForSolution(good);
        return solution;
    }
}

//Returns Solution
function searchForSolution(boards){
    if (boards.length < 1){
        return false
    }

    else {
        // backtracking search for solution
        var first = boards.shift();
        const tryPath = solve(first);
        if (tryPath != false){
            return tryPath;
        }
        else{
            return searchForSolution(boards);
        }
    }
}

//Checks to see if the sudoku is solved
function isSolved(board){
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

//Populates Board
function nextSquares(board){ 
    var res = []
    const firstEmpty = findEmptySquare(board)
    if (firstEmpty != undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (var i = 1; i <= 9; i++){
            var newBoard = [...board]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

//Gets first empty Square
function findEmptySquare(board){
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}

//Filters out invalid squares
function keepOnlyValid(boards){
    var res = []
    for (var i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}

//Checks if the there are no repeating numbers in the rows
function rowsGood(board){
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                cur.push(board[i][j])
            }
        }
    }
    return true
}

//Checks if the there are no repeating numbers in the columns
function columnsGood(board){
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true
}

//Checks if the there are no repeating numbers in the boxes
function boxesGood(board){
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            var cur = []
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}

//Validates board
function validBoard(board){
    return rowsGood(board) && columnsGood(board) && boxesGood(board)
}

//Keeps only valid Squares
function keepOnlyValid(boards){
    var res = []
    for (var i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}

//Updates UI
function updateBoard(board) {
    if (board == false){
        for (i = 1; i <= 9; i++){
            document.getElementById("row " + String(i)).innerHTML = "NO SOLUTION EXISTS TO THE GIVEN BOARD"
        }
    }
    else{
        for (var i = 1; i <= 9; i++){
            var row = ""
            for (var j = 0; j < 9; j++){
                if (row == ""){
                    row = row + String(board[i - 1][j])
                }
                else {
                    row = row + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + String(board[i - 1][j])
                }
            }
            document.getElementById("row " + String(i)).innerHTML = row
        }
    }
}