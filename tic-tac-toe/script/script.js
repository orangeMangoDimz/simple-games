const board = document.querySelector(`.board`)
const turnTitle = document.querySelector(`.turn`)
const winner = document.querySelector(`#winner`)
const retryButton = document.querySelector(`#retry`)

let role = -1 // 0: bot or 1: player
let cells = new Array(9).fill(``)

const startGame = () => {
    getTurn()
    generateBoard()
}

const generateBoard = () => {
    turnTitle.style.display = `inline`
    cells.forEach((element, index) => {
        const newElement = document.createElement(`div`)
        newElement.id = index
        newElement.classList.add(`cell`)
        newElement.addEventListener(`click`, clicked)
        board.appendChild(newElement)
    })
}

const getTurn = () => {
    turn = Math.round(Math.random() * 1)
    // display the turn
    if (turn === 1) {
        turnTitle.innerHTML = `>> Your Turn!`
        role = 1
    }
    else {
        turnTitle.innerHTML = `>> Bot Turn`
        role = 0
    }
}

const clicked = (e) => {
    const newElement = document.createElement(`div`)
    newElement.classList.add(role === 1 ? `playerMark` : `botMark`)
    e.target.appendChild(newElement)
    e.target.removeEventListener(`click`, clicked)

    switchRole()
    checkWin()
}

const switchRole = () => {
    if (role === 1) {
        turnTitle.innerHTML = `>> Bot Turn`
        role = 0
    }
    else {
        turnTitle.innerHTML = `>> Your Turn!`
        role = 1
    }
}

const checkWin = () => {
    const squares = document.querySelectorAll(`.cell`)
    let winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    winCombos.forEach((array) => {
        let playerWins = array.every((value) => {
            const cell = document.getElementById(value)
            return cell.firstChild?.classList.contains(`playerMark`)
        })

        let botWins = array.every((value) => {
            const cell = document.getElementById(value)
            return cell.firstChild?.classList.contains(`botMark`)
        })

        if (playerWins){
            winner.style.display = `inline`
            turnTitle.style.display = `none`
            winner.textContent = `Congrats! You WIN!`
            retryButton.style.display = `inline`
            squares.forEach(square => square.removeEventListener(`click`, clicked))
        }

        else if (botWins){
            winner.style.display = `inline`
            turnTitle.style.display = `none`
            winner.textContent = `Sorry! You LOSE!`
            retryButton.style.display = `inline`
            squares.forEach(square => square.removeEventListener(`click`, clicked))
        }
    })
}

retryButton.addEventListener(`click`, () => {
    const squares = document.querySelectorAll(`.cell`)
    squares.forEach(square => {
        square.remove()
    })
    winner.style.display = `none`
    retryButton.style.display = `none`
    const title = document.querySelector(`#title`).offsetTop // smoth scroll to the top title
    window.scroll({top: title - 50,behavior: `smooth` })
    startGame()
})

startGame()

