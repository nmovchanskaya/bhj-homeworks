class Game {
  constructor() {
    this.wordElement = document.querySelector('.word');
    this.winsElement = document.querySelector('.status__wins');
    this.lossElement = document.querySelector('.status__loss');
    this.symbolsOK = 0;

    this.registerEvents(this);
  }

  registerEvents(game) {
    document.addEventListener("keyup", function(e) {

      //ignore if it was service key for upper case etc.
      if (e.key === "Shift" || e.key === "Alt" || e.key === "Meta" || e.key === "Capslock") {
        if (e.key === "Meta") {
          game.prevMeta = true;
        }
        return;
      }
      //ignore if it was change language in MacOS
      if (e.key === " " && game.prevMeta) {
        return;
      }
  
      //reset timer
      if (game.symbolsOK === 0) {
        game.timeStart = Date.now();
      }
      //get the time of new symbol
      else {
        game.timeNext = Date.now();
      }
      //check if the time is ok
      if (Math.round((game.timeNext - game.timeStart) / 1000) > game.wordElement.querySelectorAll(".symbol").length) {
        game.fail();
        return;
      }

      game.currentSymbol = Array.from(game.wordElement.querySelectorAll(".symbol"))[game.symbolsOK].textContent;
      
      //check if we entered right symbol
      if (e.key.toLowerCase() === game.currentSymbol.toLowerCase()) {
        game.success();
      }
      else {
        game.fail();
      }
    });
  }

  success() {
    //change style of correct symbol
    this.wordElement.querySelectorAll(".symbol")[this.symbolsOK].className += " symbol_correct";

    this.symbolsOK++;
    if (this.symbolsOK === this.wordElement.querySelectorAll(".symbol").length) {
      this.symbolsOK = 0;
      this.winsElement.textContent++;

      if (this.winsElement.textContent === "10") {
        alert("You won!");
        this.reset();
      }
      else {
        this.getNewWord();
      }
    }
  }

  fail() {
    this.symbolsOK = 0;
    this.lossElement.textContent++;
    if (this.lossElement.textContent === "3") {
      alert("You lost this game!");
      this.reset();
    }
    else {
      this.getNewWord();
    }
  }

  reset() {
    this.symbolsOK = 0;
    this.lossElement.textContent = 0;
    this.winsElement.textContent = 0;
    this.getNewWord();
  }

  getNewWord() {
    let words = [
      "hello",
      "plane",
      "cup",
      "movement",
      "привет",
      "success",
      "joy",
      "love",
      "interest",
      "flower",
      "сосед",
      "attraction",
      "earth",
      "morning",
      "spring",
      "august"
    ];
    let randomIdx = Math.floor(Math.random() * words.length);
    let newWordHTML = '';

    let newWord = words[randomIdx];
    for (let i = 0; i < newWord.length; i++) {
      newWordHTML += '<span class="symbol">' + newWord[i] + '</span>';
    }
    this.wordElement.innerHTML = newWordHTML;

    return newWord;
  }
}

new Game();
