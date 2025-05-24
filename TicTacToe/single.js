// X is human(minimizing player)  and   O is AI (maximizing player)
const hardness = sessionStorage.getItem('maxDepth') || 2;
const boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let winnerBox = document.querySelector(".result");
let moves = 0, win = 0;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let isWinner = () => {                              //Check in the button box
    for(let pattern of winPatterns){
        let val1= boxes[pattern[0]].innerText;
        let val2= boxes[pattern[1]].innerText;
        let val3= boxes[pattern[2]].innerText;
        if(val1==val2 && val2==val3 && val1 != ""){
            if(val1 == "X"){
            winnerBox.innerText = "Congrats, You win!";
            }else if(val1 == "O"){
                winnerBox.innerText = "Computer wins!";
            }
                winnerBox.classList.remove("hide");
                boxes.forEach((box) => box.disabled = true);
                win = 1;
        }
    }
    if(moves === 9 && win === 0){
        winnerBox.innerText = "It's Draw";
        winnerBox.classList.remove("hide");
    }
};

const checkWinner = (board) =>{                     //Check in array that we made
    for(let pattern of winPatterns){
        let val01= board[pattern[0]];
        let val02= board[pattern[1]];
        let val03= board[pattern[2]];
        if(val01==val02 && val02==val03 && val01 != ""){
            return val01;
        }
    }
    return null;
};

const minimax = (board, depth, isMaximizing, count) => {
    let winner = checkWinner(board);
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (board.every(box => box !== "")) return 0;
    
    if (count === 0) {
        return 0;
    }

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "O";
                best = Math.max(best, minimax(board, depth + 1, false, count - 1));
                board[i] = "";
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "X";
                best = Math.min(best, minimax(board, depth + 1, true, count - 1));
                board[i] = "";
            }
        }
        return best;
    }
};

const bestMove = (board) => {
    let bestVal = -Infinity;
    let move = -1;
    let maxDepth = hardness;

    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O";
            let moveVal = minimax(board, 0, false, maxDepth);
            board[i] = "";
            if (moveVal > bestVal) {
                move = i;
                bestVal = moveVal;
            }
        }
    }
    return move;
};


let playAI = () =>{
    let board = Array.from(boxes).map(box => box.innerText)
    let move = bestMove(board);
    boxes[move].innerText = "O";
    boxes[move].disabled = true;
    moves++; 
    isWinner();
};

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        if(box.innerText == ""){
            box.innerText = "X";
            box.disabled = true;
            moves++;
            isWinner();
            if(!win && moves<9){
                playAI();
            }
        }
    });
});

resetBtn.addEventListener("click", () =>{
    winnerBox.classList.add("hide");
    moves = 0;
    win = 0;
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
});

menuBtn.addEventListener("click", () =>{
    history.back();
});
