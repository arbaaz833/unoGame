let deckOfCards = againShuffle(finalDeck);

let playerDeck = [],
  comDeck = [],
  currCard = [],
  currColor,
  playerScore = 0,
  comScore = 0,
  currScore = 0;
value = 0;

function setScoreValue() {
  let queryStr = window.location.search;
  let startIndex = queryStr.indexOf("=");
  let scoreStr = "";
  for (let i = startIndex + 1; i < queryStr.length; i++) {
    scoreStr += queryStr[i];
  }
  value = parseInt(scoreStr, 10);
  document.querySelector(".winningScreen").style.display = "none";
  distributeCards();
}

function playAgain() {
  deckOfCards = againShuffle(finalDeck);
  currScore = 0;
  distributeCards();
}

function uno(button) {
  button.style.display = "none";
  checkCurrCard("player");
}

function winner(name) {
  let card = document.querySelector(".winnerCard");

  if (comScore >= value || playerScore >= value) {
    if (comScore >= value) {
      card.innerHTML = `
      <h1>COMPUTER WINS</h1>
      <p>PLAYER SCORE:${playerScore}</p>
      <p>COMPUTER SCORE:${comScore}</p>
      <button onclick="window.location.replace('./homepage.html?score');" class="playAgainButton">PLAY AGAIN</button>
      `;
    }
    if (playerScore >= value) {
      card.innerHTML = `
      <h1>PLAYER WINS</h1><hr>
      <p>PLAYER SCORE:${playerScore}</p>
      <p>COMPUTER SCORE:${comScore}</p>
      <button onclick="window.location.replace('./homepage.html?score');" class="playAgainButton">PLAY AGAIN</button>
      `;
    }
  } else {
    card.innerHTML = `
    <h2>${name} WINS THIS ROUND</h2>
    <p>COMPUTER SCORE:${comScore}<p>
    <p>PLAYER SCORE:${playerScore}</p>
    <button onclick="playAgain()" class="playAgainButton">CONTINUE</button>
    <button onclick="window.location.replace('./homepage.html');" class="playAgainButton">QUIT</button>
    `;
  }
  card.parentElement.style.display = "block";
}

function chooseColor(caller, nextPlayer) {
  console.log("in choose color");
  if (caller === "com") chooseColorCom(nextPlayer);
  else {
    let html = "";
    let div = document.querySelector(".colorBox");
    html = `
    <h2>CHOOSE A COLOR TO CONTINUE:</h2>
    <div class="colorGrid">
      <div onclick="setColor(this)" data-next-player=${nextPlayer} class="red" value="Red"></div>
      <div onclick="setColor(this)" data-next-player=${nextPlayer} class="yellow" value="Yellow"></div>
      <div onclick="setColor(this)" data-next-player=${nextPlayer} class="blue" value="Blue"></div>
      <div onclick="setColor(this)" data-next-player=${nextPlayer} class="green" value="Green"></div>
    </div>`;
    div.innerHTML = html;
    div.parentElement.style.display = "block";
  }
}

function chooseColorCom(player) {
  console.log("computer choosing color");
  const colors = [
    { color: "Red", count: 0, code: "#D40000" },
    { color: "Yellow", count: 0, code: "#ffcc00" },
    { color: "Green", count: 0, code: "#2c9f5a" },
    { color: "Blue", count: 0, code: "#2a7ffe" },
  ];
  comDeck.forEach((card) => {
    if (card.color === "Red") colors[0].count++;
    else if (card.color === "Blue") colors[3].count++;
    else if (card.color === "Green") colors[2].count++;
    else if (card.color === "Yellow") colors[1].count++;
  });
  let colorElement = colors.sort((a, b) => b.count - a.count)[0];
  currColor = colorElement.color;
  document.getElementById("color").style.backgroundColor = colorElement.code;
  if (player === "com") {
    console.log("called from chooseColorCom");
    computerRes();
  } else {
    playerRes(undefined, "true");
  }
}

function setColor(element) {
  console.log("element: ", element);
  currColor = element.getAttribute("value");
  document.getElementById("color").style.backgroundColor = `${
    currColor == "Red"
      ? "#d40000"
      : currColor == "Blue"
      ? "#2a7ffe"
      : currColor == "Green"
      ? "#2c9f5a"
      : "#ffcc00"
  }`;
  console.log("currentColor", currColor);
  if (element.dataset.nextPlayer === "com") {
    console.log("called from setcolor");
    computerRes();
  } else {
    playerRes();
  }
  document.querySelector(".chooseColorContainer").style.display = "none";
}

function updateCurrCard(card) {
  let currCardDiv = document.getElementById("currCard");
  let src,
    html = "";
  if (card.hasOwnProperty("number")) {
    src = `./unoCardsImages/${card.color}_${card.number}.jpg`;
  } else if (card.hasOwnProperty("type")) {
    src = `./unoCardsImages/${card.color}_${card.type}.jpg`;
  }
  html += `
    <img  class="card-img" src="${src}" />
`;
  currCardDiv.innerHTML = html;
}

function distributeCards() {
  document.querySelector(".winningScreen").style.display = "none";
  let count = 1;
  comDeck = [];
  playerDeck = [];
  //distributing cards to players, each will have 7 cards from the deck alternately.
  while (count <= 14) {
    if (count % 2 != 0) {
      comDeck.push(...deckOfCards.splice(0, 1));
    } else playerDeck.push(...deckOfCards.splice(0, 1));
    count++;
  }
  currCard.push(...deckOfCards.splice(0, 1)); //setting the current card after distributing to the players
  currColor = currCard[0].color; //setting the color of the game according to the card.
  updateCurrCard(currCard[0]);
  if (currCard[0].type == "Wild card4") {
    deckOfCards = againShuffle(finalDeck);
    currCard.splice(0,1);
    return distributeCards();
  }
  if (currCard[0].type === "Wild card") chooseColor("com", "player");
  playerView();
  comView();
  document.getElementById("color").style.backgroundColor =
    currColor == "Red"
      ? "#d40000"
      : currColor == "Blue"
      ? "#2a7ffe"
      : currColor == "Green"
      ? "#2c9f5a"
      : "#ffcc00";
  computerRes();
}

function playerView() {
  let container = document.getElementById("playerArea");
  let html = "";
  playerDeck.forEach((card, ind) => {
    let src;
    if (card.hasOwnProperty("number")) {
      src = `./unoCardsImages/${card.color}_${card.number}.jpg`;
    } else if (card.hasOwnProperty("type")) {
      src = `./unoCardsImages/${card.color}_${card.type}.jpg`;
    }
    if (playerDeck.length == 1) {
      html += `
      <div style="margin-left:auto; margin-right:auto;" class="card-container" >
        <img  class="card-img" src="${src}" />
      </div>
    `;
    } else if (ind == 0) {
      html += `
      <div style="margin-left:auto;" class="card-container" >
        <img  class="card-img" src="${src}" />
      </div>
    `;
    } else if (ind == playerDeck.length - 1) {
      html += `
      <div style="margin-right:auto;" class="card-container" >
        <img  class="card-img" src="${src}" />
      </div>
    `;
    } else {
      html += `
      <div class="card-container" >
        <img  class="card-img" src="${src}" />
      </div>
    `;
    }
  });
  container.innerHTML = html;
}

function comView() {
  let container = document.getElementById("comArea");
  let html = "";
  comDeck.forEach((card, index) => {
    if (comDeck.length == 1) {
      html += `
    <div style="margin-left:auto;margin-right:auto" class="card-container" >
      <img  class="card-img" src="./unoCardsImages/UNO-Back.jpg"/>
    </div>`;
    } else if (index == 0) {
      html += `
    <div style="margin-left:auto;" class="card-container" >
      <img  class="card-img" src="./unoCardsImages/UNO-Back.jpg"/>
    </div>`;
    } else if (index === comDeck.length - 1) {
      html += `
    <div style="margin-right:auto;" class="card-container" >
      <img  class="card-img" src="./unoCardsImages/UNO-Back.jpg"/>
    </div>`;
    } else {
      html += `
      <div class="card-container" >
        <img class="card-img" src="./unoCardsImages/UNO-Back.jpg"/>
      </div>`;
    }
  });
  container.innerHTML = html;
}

//this function will get the top card from the deck and also remove it.
function getCard(caller = "player") {
  if (deckOfCards.length === 0) {
    let newDeck = againShuffle(currCard.splice(1, currCard.length - 1));
    deckOfCards.push(...newDeck);
  }
  let topCard = deckOfCards.splice(0, 1);
  if (caller == "player") {
    playerDeck.push(...topCard);
    document
      .getElementById("remCards")
      .firstElementChild.removeAttribute("onclick");
    playerView();
    playerRes("taken");
  } else {
    comDeck.push(...topCard);
    comView();
    console.log("called from get card");
    computerRes("taken");
  }
}

//to get the computer response
function computerRes(state = "notTaken") {
  let comDiv = document.getElementById("comArea");
  comDiv.style.animationName = "indicator";
  document.getElementById("playerArea").style.animationName = "none";
  document.getElementById("turnButton").style.display = "none";
  setTimeout(() => {
    let playableCards = [],
      response;

    //////generating the responses according to the current card////////////////////////////
    if (currCard[0].color !== "Black") {
      playableCards = comDeck.filter((ele) => {
        if (currCard[0].hasOwnProperty("type")) {
          if (ele.type === currCard[0].type) return ele;
          if (ele.color === currCard[0].color) return ele;
        } else if (
          ele.color === currCard[0].color ||
          ele.number === currCard[0].number
        ) {
          return ele;
        }
        if (ele.color === "Black") return ele;
      });
      console.log("playableCards: ", playableCards);
      if (playableCards.length == 0 && state === "notTaken") {
        getCard("com");
        return;
      }
    } else {
      playableCards = comDeck.filter((ele) => {
        if (ele.color === currColor) {
          return ele;
        } else if (ele.color === "Black") return ele;
      });
      if (playableCards.length == 0 && state === "notTaken") {
        getCard("com");
        return;
      }
    }

    if (playableCards.length !== 0) {
      ///////seperating cards according to the types///////////////////////
      let colorNumCards = [],
        colorActionCards = [],
        numberCards = [],
        WildCards = [];
      playableCards.forEach((element) => {
        if (currCard[0].color !== "Black") {
          if (
            element.color == currCard[0].color &&
            element.hasOwnProperty("number")
          )
            colorNumCards.push(element.number);
          if (element.number == currCard[0].number) numberCards.push(element);
          if (
            element.color == currCard[0].color &&
            element.hasOwnProperty("type")
          )
            colorActionCards.push(element.type);
        } else {
          if (element.color == currColor && element.hasOwnProperty("number"))
            colorNumCards.push(element.number);
          if (element.color == currColor && element.hasOwnProperty("type"))
            colorActionCards.push(element.type);
        }

        if (element.type == "Wild card" || element.type == "Wild card4")
          WildCards.push(element.type);
      });

      ///// utilizing action cards first/////////////////////////
      if (colorActionCards.length !== 0) {
        if (colorActionCards.includes("Reverse")) {
          response = { color: `${currColor}`, type: "Reverse" };
        } else if (colorActionCards.includes("Skip")) {
          response = { color: `${currColor}`, type: "Skip" };
        } else if (colorActionCards.includes("Draw")) {
          response = { color: `${currColor}`, type: "Draw" };
        }
      } else if (WildCards.includes("Wild card4")) {
        response = { color: "Black", type: "Wild card4" };
      }

      ///////color num cards 2nd//////////////////////////
      else if (colorNumCards.length != 0) {
        let highestNum = Math.max(...colorNumCards);
        if (currCard[0].color !== "Black") {
          response = { color: `${currCard[0].color}`, number: highestNum };
        } else response = { color: `${currColor}`, number: highestNum };
      }
      //////number cards 3rd///////////////////////////////
      else if (numberCards.length !== 0) {
        response = numberCards[0];
      }
      /////Wild card last////////////////////
      else if (WildCards.length !== 0) {
        if (WildCards.includes("Wild card")) {
          response = { color: "Black", type: "Wild card" };
        }
      }
      console.log("aaaaa", response);
      console.log("COMDECK", comDeck);
      let index = comDeck.findIndex((card) => {
        if (card.hasOwnProperty("type")) {
          return card.color == response.color && card.type == response.type;
        }
        if (card.hasOwnProperty("number")) {
          return card.color == response.color && card.number == response.number;
        }
      });
      console.log("index:", index);
      comDeck.splice(index, 1);
      currCard.unshift(response);
      currColor = currCard[0].color;
      document.getElementById(
        "color"
      ).style.backgroundColor = `${currColor.toLowerCase()}`;
      updateCurrCard(currCard[0]);
      comView();
      if (comDeck.length == 0) {
        playerDeck.forEach((card) => {
          if (card.hasOwnProperty("number")) {
            currScore += card.number;
          } else if (card.hasOwnProperty("type") && card.color !== "Black") {
            currScore += 20;
          } else {
            currScore += 50;
          }
        });
        comScore += currScore;
        winner("COMPUTER");
        return;
      }
      ///checking card and assigning turn to the right player
      checkCurrCard("com");
    } else {
      playerRes(undefined, "true");
    }
  }, 2000);
}

function playerRes(state = "notTaken", playAudio = "false") {
  document.getElementById("comArea").style.animationName = "none";
  document.getElementById("playerArea").style.animationName = "indicator";
  if (playAudio === "true") {
    let sound = document.getElementById("audio");
    sound.play();
    setTimeout(() => {
      sound.pause();
      sound.currentTime = 00;
    }, 1000);
  }
  let playableCards = [];
  if (currCard[0].color !== "Black") {
    playableCards = playerDeck.filter((ele) => {
      if (currCard[0].hasOwnProperty("type")) {
        if (ele.type === currCard[0].type) return ele;
        if (ele.color === currCard[0].color) return ele;
      } else if (
        ele.color === currCard[0].color ||
        ele.number === currCard[0].number
      ) {
        return ele;
      }
      if (ele.color === "Black") return ele;
    });
  } else {
    playableCards = playerDeck.filter((ele) => {
      if (ele.color === currColor) {
        return ele;
      } else if (ele.color === "Black") return ele;
    });
  }

  if (state === "notTaken") {
    document
      .getElementById("remCards")
      .firstElementChild.setAttribute("onclick", "getCard()");
  } else {
    document.getElementById("turnButton").style.display = "block";
  }

  let container = document.getElementById("playerArea");
  let html = "";
  playerDeck.forEach((card, ind) => {
    let src;
    if (card.hasOwnProperty("number")) {
      src = `./unoCardsImages/${card.color}_${card.number}.jpg`;
    } else if (card.hasOwnProperty("type")) {
      src = `./unoCardsImages/${card.color}_${card.type}.jpg`;
    }
    if (playableCards.includes(card)) {
      html += `
    <div ${
      playerDeck.length == 1
        ? 'style="margin-left:auto;margin-right:auto"'
        : ind == 0
        ? 'style="margin-left:auto"'
        : ind == playerDeck.length - 1
        ? 'style="margin-right:auto"'
        : "style=''"
    } class="card-container">
      <img id="clickable" onclick="playerCard(event)" data-card-color=${
        card.color
      } data-card-number=${card.number} data-card-type="${
        card.type
      }" class="card-img" src="${src}" />
    </div>
  `;
    } else {
      html += `
    <div ${
      playerDeck.length == 1
        ? 'style="margin-left:auto;margin-right:auto"'
        : ind == 0
        ? 'style="margin-left:auto"'
        : ind == playerDeck.length - 1
        ? 'style="margin-right:auto"'
        : "style=''"
    } class="card-container" >
      <img  class="card-img" src="${src}" />
    </div>
  `;
    }
  });
  container.innerHTML = html;
}

function playerCard(e) {
  let obj;
  if (e.target.dataset.cardType !== "undefined") {
    obj = {
      color: e.target.dataset.cardColor,
      type: e.target.dataset.cardType,
    };
  } else {
    obj = {
      color: e.target.dataset.cardColor,
      number: parseInt(e.target.dataset.cardNumber, 10),
    };
  }
  let index = playerDeck.findIndex((element) => {
    if (obj.hasOwnProperty("type")) {
      if (element.color == obj.color && element.type == obj.type) return true;
    } else {
      if (element.color == obj.color && element.number == obj.number)
        return true;
    }
  });

  currCard.unshift(playerDeck[index]);
  console.log("playerCard", currCard[0]);
  currColor = playerDeck[index].color;
  document.getElementById(
    "color"
  ).style.backgroundColor = `${currColor.toLowerCase()}`;
  playerDeck.splice(index, 1);
  updateCurrCard(currCard[0]);
  playerView();
  if (playerDeck.length == 0) {
    comDeck.forEach((card) => {
      if (card.hasOwnProperty("number")) {
        currScore += card.number;
      } else if (card.hasOwnProperty("type") && card.color !== "Black") {
        currScore += 20;
      } else {
        currScore += 50;
      }
    });
    playerScore += currScore;
    winner("PLAYER");
    return;
  }
  if (playerDeck.length == 1) {
    let unoButton = document.getElementById("unoButton");
    let cardsDiv = document.getElementById("playerArea").children;
    for (let i = 0; i < cardsDiv.length; i++) {
      if (cardsDiv[i].firstElementChild.hasAttribute("onclick")) {
        cardsDiv[i].firstElementChild.removeAttribute("onclick");
      }
    }
    unoButton.style.display = "inline-block";
    setTimeout(() => {
      if (unoButton.style.display !== "none") {
        playerDeck.push(...deckOfCards.splice(0, 2));
        playerView();
        unoButton.style.display = "none";
        checkCurrCard("player");
      }
      return;
    }, 2000);
    return;
  }
  checkCurrCard("player");
}

function checkCurrCard(caller) {
  // if card is Skip or Reverse////////////////////
  if (currCard[0].type === "Skip" || currCard[0].type === "Reverse") {
    if (caller === "com") {
      console.log("called from skip/reverse");
      computerRes();
    } else if (caller === "player") playerRes();
  }
  //// if card is Draw2 or Wild/////////////////////////
  else if (currCard[0].type === "Draw" || currCard[0].type === "Wild card4") {
    if (caller === "com") {
      if (currCard[0].type === "Draw") {
        playerDeck.push(...deckOfCards.splice(0, 2));
        playerView();
        console.log("called from draw /wild card4");
        computerRes();
      } else if (currCard[0].type === "Wild card4") {
        playerDeck.push(...deckOfCards.splice(0, 4));
        playerView();
        console.log("computer choosing color");
        chooseColor(caller, caller);
      }
    } else if (caller === "player") {
      if (currCard[0].type === "Draw") {
        comDeck.push(...deckOfCards.splice(0, 2));
        comView();
        playerRes();
      } else if (currCard[0].type === "Wild card4") {
        comDeck.push(...deckOfCards.splice(0, 4));
        comView();
        console.log("caliing choose color");
        chooseColor(caller, caller);
      }
    }
  }
  /// if card is Wild //////////////////////
  else if (currCard[0].type === "Wild card") {
    console.log("wild card");
    chooseColor(caller, caller === "com" ? "player" : "com");
  }
  ///other normal cards///////////////////////////
  else {
    console.log({ caller });
    if (caller === "com") {
      playerRes(undefined, "true");
    } else {
      console.log("called from normal cards");
      computerRes();
    }
  }
}

document.querySelector(".winnerCard").innerHTML = `
<button onclick="setScoreValue();" style="margin-top:7rem;min-width:9rem;min-height:3rem;" class="playAgainButton">START GAME</button>
`;
document.querySelector(".winnerCard").parentElement.style.display = "block";
