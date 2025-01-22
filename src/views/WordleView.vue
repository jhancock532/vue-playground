<template>
  <div class="wordle">
    <h1>Wordle</h1>
    
    <div class="game-board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div 
          v-for="(cell, colIndex) in row" 
          :key="colIndex" 
          class="cell"
          :class="getCellClass(rowIndex, colIndex)"
        >
          {{ cell }}
        </div>
      </div>
    </div>

    <div class="keyboard">
      <div v-for="row in keyboard" :key="row.join('')" class="keyboard-row">
        <button 
          v-for="key in row" 
          :key="key"
          @click="handleKeyInput(key)"
          :class="getKeyClass(key)"
          class="key"
        >
          {{ key }}
        </button>
      </div>
    </div>

    <div v-if="gameOver" class="game-over">
      <h2>{{ won ? 'Congratulations!' : 'Game Over!' }}</h2>
      <p>The word was: {{ currentWord }}</p>
      <button @click="resetGame" class="reset-btn">Play Again</button>
    </div>
  </div>
</template>

<script>
const WORDS = [
  'APPLE', 'BEACH', 'CLOUD', 'DANCE', 'EAGLE',
  'FLAME', 'GRAPE', 'HEART', 'IMAGE', 'JUICE',
  'KNIFE', 'LEMON', 'MUSIC', 'NIGHT', 'OCEAN',
  'PIANO', 'QUEEN', 'RIVER', 'STORM', 'TIGER'
];

export default {
  name: 'WordleView',
  data() {
    return {
      currentWord: '',
      board: Array(6).fill().map(() => Array(5).fill('')),
      currentRow: 0,
      currentCol: 0,
      gameOver: false,
      won: false,
      usedLetters: {},
      keyboard: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
      ]
    };
  },
  created() {
    this.resetGame();
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    resetGame() {
      this.currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      this.board = Array(6).fill().map(() => Array(5).fill(''));
      this.currentRow = 0;
      this.currentCol = 0;
      this.gameOver = false;
      this.won = false;
      this.usedLetters = {};
    },
    handleKeyDown(event) {
      if (this.gameOver) return;
      
      const key = event.key.toUpperCase();
      if (key === 'ENTER') {
        this.submitGuess();
      } else if (key === 'BACKSPACE') {
        this.deleteLetter();
      } else if (/^[A-Z]$/.test(key)) {
        this.addLetter(key);
      }
    },
    handleKeyInput(key) {
      if (this.gameOver) return;
      
      if (key === 'ENTER') {
        this.submitGuess();
      } else if (key === '⌫') {
        this.deleteLetter();
      } else {
        this.addLetter(key);
      }
    },
    addLetter(letter) {
      if (this.currentCol < 5) {
        this.board[this.currentRow][this.currentCol] = letter;
        this.currentCol++;
      }
    },
    deleteLetter() {
      if (this.currentCol > 0) {
        this.currentCol--;
        this.board[this.currentRow][this.currentCol] = '';
      }
    },
    submitGuess() {
      if (this.currentCol !== 5) return;

      const guess = this.board[this.currentRow].join('');
      const word = this.currentWord;

      // Update used letters
      for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        if (!this.usedLetters[letter]) {
          this.usedLetters[letter] = this.getLetterResult(letter, i, word);
        }
      }

      if (guess === word) {
        this.gameOver = true;
        this.won = true;
      } else if (this.currentRow === 5) {
        this.gameOver = true;
      } else {
        this.currentRow++;
        this.currentCol = 0;
      }
    },
    getLetterResult(letter, index, word) {
      if (word[index] === letter) return 'correct';
      if (word.includes(letter)) return 'present';
      return 'absent';
    },
    getCellClass(row, col) {
      if (row >= this.currentRow) return '';
      
      const letter = this.board[row][col];
      const result = this.getLetterResult(letter, col, this.currentWord);
      return result;
    },
    getKeyClass(key) {
      if (key === 'ENTER' || key === '⌫') return '';
      return this.usedLetters[key] || '';
    }
  }
};
</script>

<style lang="scss" scoped>

.wordle {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  
  h1 {
    color: $text-color;
    margin-bottom: 20px;
  }
}

.game-board {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 30px;
}

.row {
  display: flex;
  gap: 5px;
}

.cell {
  width: 50px;
  height: 50px;
  border: 2px solid $secondary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  
  &.correct {
    background-color: $success-color;
    color: white;
    border-color: $success-color;
  }
  
  &.present {
    background-color: $warning-color;
    color: white;
    border-color: $warning-color;
  }
  
  &.absent {
    background-color: $text-color;
    color: white;
    border-color: $text-color;
  }
}

.keyboard {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.key {
  min-width: 40px;
  height: 50px;
  padding: 0 10px;
  border: none;
  border-radius: 4px;
  background-color: $secondary-color;
  color: white;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
  
  &.correct {
    background-color: $success-color;
  }
  
  &.present {
    background-color: $warning-color;
  }
  
  &.absent {
    background-color: $error-color;
  }
}

.game-over {
  margin-top: 20px;
  text-align: center;
  
  h2 {
    color: $text-color;
    margin-bottom: 10px;
  }
  
  .reset-btn {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
