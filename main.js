let triesElement = document.querySelector(".tries span");
let timerElement = document.querySelector(".info-container .timer");

document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Whats your name?");
  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
  countdown(90);
}

let countdownInterval;
let success = 0;
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys())

shuffle(orderRange);

blocks.forEach((ele, index) => {
  ele.style.order = orderRange[index];
  ele.addEventListener("click", function () {
    flipBlock(ele);
  })
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.app === secondBlock.dataset.app) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.querySelector("#success").play();
    success++;
    if (success === blocks.length / 2) {
      clearInterval(countdownInterval);
      successfun();
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.querySelector("#fail").play();
  }
}

function shuffle(array) {
  let current = array.length,
      temp,
      random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function successfun() {
  let div = document.createElement("div");
  div.className = "success";
  div.innerHTML = `congratulations, you won after ${triesElement.innerHTML} wrong attempts`;
  document.querySelector(".finish").append(div);
  document.querySelector("#win").play();
}

function lossfun() {
  blocksContainer.classList.add("no-clicking");
  let div = document.createElement("div");
  div.className = "loss";
  div.innerHTML = `Game over`;
  document.querySelector(".finish").append(div);
  document.querySelector("#loss").play();
}

function countdown(duration) {
    let minutes, seconds;
    countdownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      timerElement.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countdownInterval);
        lossfun();
      }
    }, 1000);
}