<template>
    <div>
        <button @click="this.$router.push('/v/viewer')" class="backButton"><i class="fa-solid fa-backward"></i>Go back</button>
        <div class="tictactoe">
            <div v-if="!winner && !isDraw" class="board">
                <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
                    <div class="cell" v-for="(cell, cellIndex) in row" :key="cellIndex"
                        @click="makeMove(rowIndex, cellIndex)">
                        {{ cell }}
                    </div>
                </div>
            </div>
            <div v-if="winner" class="winner">{{ winner }} wins!</div>
            <div v-else-if="isDraw" class="draw">It's a draw!</div>
            <button v-if="winner || isDraw" class="restart-button" @click="restartGame">Restart</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            currentPlayer: 'X',
            winner: null,
            isComputerThinking: false
        }
    },
    computed: {
        isDraw() {
            return this.board.every(row => row.every(cell => cell !== ''))
        }
    },
    methods: {
        makeMove(rowIndex, cellIndex) {
            if (this.board[rowIndex][cellIndex] === '' && !this.winner && !this.isComputerThinking) {
                this.board[rowIndex][cellIndex] = this.currentPlayer
                this.checkForWinner()
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
                if (!this.winner && this.currentPlayer === 'O') {
                    this.isComputerThinking = true
                    setTimeout(() => {
                        this.makeRandomMove()
                        this.isComputerThinking = false
                    }, 1000)
                }
            }
        },
        checkForWinner() {
            const winningLines = [
                // horizontal
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                // vertical
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                // diagonal
                [0, 4, 8],
                [2, 4, 6]
            ]
            for (let i = 0; i < winningLines.length; i++) {
                const [a, b, c] = winningLines[i]
                if (
                    this.board[Math.floor(a / 3)][a % 3] &&
                    this.board[Math.floor(a / 3)][a % 3] === this.board[Math.floor(b / 3)][b % 3] &&
                    this.board[Math.floor(a / 3)][a % 3] === this.board[Math.floor(c / 3)][c % 3]
                ) {
                    this.winner = this.currentPlayer
                    break
                }
            }
        },
        makeRandomMove() {
            let rowIndex, cellIndex
            do {
                rowIndex = Math.floor(Math.random() * 3)
                cellIndex = Math.floor(Math.random() * 3)
            } while (this.board[rowIndex][cellIndex] !== '')
            this.board[rowIndex][cellIndex] = this.currentPlayer
            this.checkForWinner()
            this.currentPlayer = 'X'
        },
        restartGame() {
            this.board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
            this.currentPlayer = 'X'
            this.winner = null
        }
    }
}
</script>

<style scoped>

.backButton {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    background-color: #1e90ff;
    color: white;
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 20px;
}

.backButton > i {
    margin-right: 10px;
}
.tictactoe {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.board {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
}

.row {
    display: flex;
}

.cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: 1px solid black;
    font-size: 32px;
    cursor: pointer;
}

.winner {
    margin-top: 10px;
    font-size: 24px;
    font-weight: bold;
}

.draw {
    margin-top: 10px;
    font-size: 24px;
    font-weight: bold;
}

.restart-button {
    margin-top: 10px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}

.cell.computer-thinking {
    background-color: #ccc;
    animation: computer-thinking 1s infinite;
}

@keyframes computer-thinking {
    0% {
        opacity: 0.2;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 0.2;
    }
}
</style>
