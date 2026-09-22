let board = document.querySelector("#boards")
let boxes = document.querySelectorAll(".box")
let winner = document.querySelector("#winner")
let winnername = document.querySelector("#winnername")
let playagain = document.querySelector("#restart")
let reset = document.querySelector("#reset")
// boxes.forEach((box) => {
//   box.addEventListener("click",(e) => {
//     console.log(e.target)
//   }
//   )
// }
// )


let gameover = false
let current_playerX = true
function rungame() {
    board.addEventListener("click", (e) => {
        if (gameover) {
            return
        }
        else {
            let box = e.target
            if (box.classList.contains("box")) {

                if (box.textContent.trim() !== "") {
                    return
                }
                if (current_playerX) {
                    box.textContent = "X"
                    current_playerX = false
                }
                else {
                    box.textContent = "O"
                    current_playerX = true
                }
                checkWinner(boxes)
            }
        }
    })
}
rungame()
// we use event deligation method



function checkWinner(box) {

    let line1 = box[0].textContent !== "" &&
        box[0].textContent === box[1].textContent &&
        box[1].textContent === box[2].textContent
    let line2 = box[3].textContent !== "" &&
        box[3].textContent === box[4].textContent &&
        box[4].textContent === box[5].textContent
    let line3 = box[6].textContent !== "" &&
        box[6].textContent === box[7].textContent &&
        box[7].textContent === box[8].textContent
    let digo = box[2].textContent !== "" &&
        box[2].textContent === box[4].textContent &&
        box[4].textContent === box[6].textContent
    let digo2 = box[0].textContent !== "" &&
        box[0].textContent === box[4].textContent &&
        box[4].textContent === box[8].textContent
    let row1 = box[0].textContent !== "" &&
        box[0].textContent === box[3].textContent &&
        box[3].textContent === box[6].textContent
    let row2 = box[1].textContent !== "" &&
        box[1].textContent === box[4].textContent &&
        box[4].textContent === box[7].textContent
    let row3 = box[2].textContent !== "" &&
        box[2].textContent === box[5].textContent &&
        box[5].textContent === box[8].textContent



    if (line1 || line2 || line3 || digo || digo2 || row1 || row2 || row3) {
        if (current_playerX) {
            console.log("O")
            winnername.textContent = 'O won the match'
            // winner.classList.add("text-cyan-400","font-black", "mb-5")
            winner.classList.remove("hidden")
            gameover = true
            reset.classList.add("hidden")


        }
        else {
            console.log("X")
            winnername.textContent = 'X won the match'
            //  winner.classList.add("text-cyan-400","font-black","mb-5")
            winner.classList.remove("hidden")
            gameover = true
            reset.classList.add("hidden")
        }

    }


    else {
        let isdraw = [...boxes].every((box) => {
            return box.textContent.trim() !== ""
        })


        if (isdraw) {
            winnername.textContent = 'Match draw'
            // winner.classList.add("text-cyan-400","font-black", "mb-5")
            winner.classList.remove("hidden")
            gameover = true
            reset.classList.add("hidden")
        }
    }




}

playagain.addEventListener("click", (e) => {
    boxes.forEach((box) => {
        box.textContent = ""
    })
    gameover = false;
    current_playerX = true;
    // rungame()
    winner.classList.add("hidden")
    reset.classList.remove("hidden")
})

// reset game

reset.addEventListener("click", (e) => {
    boxes.forEach((box) => {
        box.textContent = ""
    })
    gameover = false;
    current_playerX = true;
    // rungame()
    // winner.classList.add("hidden")
}
)