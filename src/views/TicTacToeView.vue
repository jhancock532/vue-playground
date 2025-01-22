<script setup>
import Button from '../components/Button.vue';
import TicTacToeCell from '../components/TicTacToeCell.vue';
import { ref, reactive } from 'vue';

const gameStatus = ref('playing');

const gameBoard = reactive([
  ['empty','empty','empty'],
  ['empty','empty','empty'],
  ['empty','empty','empty']
])

function checkForWin(){
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (gameBoard[i][0] !== 'empty' && 
        gameBoard[i][0] === gameBoard[i][1] && 
        gameBoard[i][1] === gameBoard[i][2]) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (gameBoard[0][i] !== 'empty' && 
        gameBoard[0][i] === gameBoard[1][i] && 
        gameBoard[1][i] === gameBoard[2][i]) {
      return true;
    }
  }

  // Check diagonal top-left to bottom-right
  if (gameBoard[0][0] !== 'empty' && 
      gameBoard[0][0] === gameBoard[1][1] && 
      gameBoard[1][1] === gameBoard[2][2]) {
    return true;
  }

  // Check diagonal top-right to bottom-left
  if (gameBoard[0][2] !== 'empty' && 
      gameBoard[0][2] === gameBoard[1][1] && 
      gameBoard[1][1] === gameBoard[2][0]) {
    return true;
  }

  return false;
}

function checkForDraw(){
  return gameBoard.every(row => row.every(cell => cell !== 'empty'));
}

function resetBoard(){
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameBoard[i][j] = 'empty';
    }
  }
  gameStatus.value = 'playing';
}

function updateBoard(x_index, y_index){
  gameBoard[x_index][y_index] = 'x';

  if (checkForWin()) {
    gameStatus.value = 'user_won';
  } else if (checkForDraw()) {
    gameStatus.value = 'draw';
  } else {
    let cpu_x_index = Math.floor(Math.random() * 3);
    let cpu_y_index = Math.floor(Math.random() * 3);
    while (gameBoard[cpu_x_index][cpu_y_index] !== 'empty') {
      cpu_x_index = Math.floor(Math.random() * 3);  
      cpu_y_index = Math.floor(Math.random() * 3);
    }
    gameBoard[cpu_x_index][cpu_y_index] = 'o';

    if (checkForWin()) {
      gameStatus.value = 'cpu_won';
    } else if (checkForDraw()) {
      gameStatus.value = 'draw';
    }
  }
}
</script>

<template>
    <h1>Tic Tac Toe</h1>
    <p>Enjoy playing a classic game of Tic Tac Toe against a <strong>somewhat</strong> advanced AI opponent.</p>
    <p v-if="gameStatus === 'playing'">You are X, the computer is O. Your move first!</p>
    <p v-if="gameStatus === 'user_won'">Congratulations! You win! 🎉</p>
    <p v-if="gameStatus === 'cpu_won'">You lost! 😥</p>
    <p v-if="gameStatus === 'draw'">It's a draw. 😐</p>
    <div class="board">
      <div class="row" v-for="(row, x_index) in gameBoard"> 
        <div class="cell" v-for="(cell, y_index) in row">
          <TicTacToeCell :enabled="gameStatus === 'playing'" :contents="cell" @click="updateBoard(x_index, y_index)" />
        </div>
      </div>
    </div>
    <Button class="play-again-button" variant="primary" v-if="gameStatus !== 'playing'" @click="resetBoard()">Play again.</Button>
</template>

<style lang="scss" scoped>

.play-again-button {
  margin-top: 20px;
  margin-left: 20px;
}

.board {
  margin: 30px auto 0;
  width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.cell {
  width: 100px;
  height: 100px;
  border-bottom: 10px solid $black-color;
  border-right: 10px solid $black-color;
}

.row:last-child .cell {
  border-right: none;
}

.row .cell:last-child {
  border-bottom: none;
}
</style> 