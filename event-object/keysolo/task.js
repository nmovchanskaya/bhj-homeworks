class Game {
  constructor() {
    this.wordElement = document.querySelector('.word');
    this.winsElement = document.querySelector('.status__wins');
    this.lossElement = document.querySelector('.status__loss');
    this.symbolsOK = 0;

    let registerEventsBinded = this.registerEvents.bind(this);
    registerEventsBinded();
  }

  registerEvents() {
    document.addEventListener("keyup", (e) => {

      //ignore if it was service key for upper case etc.
      if (e.key === "Shift" && e.ctrlKey ||
          e.key === "Ctrl" && e.shiftKey ||
          e.key === "Shift" && e.altKey || 
          e.key === "Alt" && e.shiftKey || 
          e.key === " " && e.metaKey || 
          e.key === "Capslock" ||
          e.key === "Meta") {
        return;
      }
  
      //reset timer
      if (this.symbolsOK === 0) {
        this.timeStart = Date.now();
      }
      //get the time of new symbol
      else {
        this.timeNext = Date.now();
      }
      //check if the time is ok
      if (Math.round((this.timeNext - this.timeStart) / 1000) > this.wordElement.querySelectorAll(".symbol").length) {
        this.fail();
        return;
      }

      this.currentSymbol = Array.from(this.wordElement.querySelectorAll(".symbol"))[this.symbolsOK].textContent;
      
      //check if we entered right symbol
      if (e.key.toLowerCase() === this.currentSymbol.toLowerCase()) {
        this.success();
      }
      else {
        this.fail();
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

let game = new Game();
