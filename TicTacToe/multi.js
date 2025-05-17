const boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let winnerBox = document.querySelector(".result");
let currMove = "X";
let moves = 0, win = 0;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let isWinner = () => {
    for(let pattern of winPatterns){
        let val1= boxes[pattern[0]].innerText;
        let val2= boxes[pattern[1]].innerText;
        let val3= boxes[pattern[2]].innerText;
        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1==val2 && val2==val3){
                winnerBox.innerText = `Congratulations, Winner is ${val1}`;
                winnerBox.classList.remove("hide");
                boxes.forEach((box) => box.disabled = true);
                win = 1;
            }
        }
    }
    if(moves === 9 && win === 0){
        winnerBox.innerText = "It's Draw";
        winnerBox.classList.remove("hide");
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        if(currMove == "X"){
            box.innerText = "X";
            currMove = "O";
            moves++;
        }else{
            box.innerText = "O";
            currMove = "X";
            moves++;
        }
        box.disabled = true;
        isWinner();
    });
});

resetBtn.addEventListener("click", () =>{
    winnerBox.classList.add("hide");
    currMove = "X";
    moves = 0;
    win = 0;
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
});