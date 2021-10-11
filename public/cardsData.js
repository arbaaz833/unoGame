let redNumCardsArr = [
  { color: "Red", number: 0 },
  { color: "Red", number: 1 },
  { color: "Red", number: 2 },
  { color: "Red", number: 3 },
  { color: "Red", number: 4 },
  { color: "Red", number: 5 },
  { color: "Red", number: 6 },
  { color: "Red", number: 7 },
  { color: "Red", number: 8 },
  { color: "Red", number: 9 },
  { color: "Red", number: 1 },
  { color: "Red", number: 2 },
  { color: "Red", number: 3 },
  { color: "Red", number: 4 },
  { color: "Red", number: 5 },
  { color: "Red", number: 6 },
  { color: "Red", number: 7 },
  { color: "Red", number: 8 },
  { color: "Red", number: 9 },
];

let greenNumCardsArr = [
  { color: "Green", number: 0 },
  { color: "Green", number: 1 },
  { color: "Green", number: 2 },
  { color: "Green", number: 3 },
  { color: "Green", number: 4 },
  { color: "Green", number: 5 },
  { color: "Green", number: 6 },
  { color: "Green", number: 7 },
  { color: "Green", number: 8 },
  { color: "Green", number: 9 },
  { color: "Green", number: 1 },
  { color: "Green", number: 2 },
  { color: "Green", number: 3 },
  { color: "Green", number: 4 },
  { color: "Green", number: 5 },
  { color: "Green", number: 6 },
  { color: "Green", number: 7 },
  { color: "Green", number: 8 },
  { color: "Green", number: 9 },
];
let blueNumCardsArr = [
  { color: "Blue", number: 0 },
  { color: "Blue", number: 1 },
  { color: "Blue", number: 2 },
  { color: "Blue", number: 3 },
  { color: "Blue", number: 4 },
  { color: "Blue", number: 5 },
  { color: "Blue", number: 6 },
  { color: "Blue", number: 7 },
  { color: "Blue", number: 8 },
  { color: "Blue", number: 9 },
  { color: "Blue", number: 1 },
  { color: "Blue", number: 2 },
  { color: "Blue", number: 3 },
  { color: "Blue", number: 4 },
  { color: "Blue", number: 5 },
  { color: "Blue", number: 6 },
  { color: "Blue", number: 7 },
  { color: "Blue", number: 8 },
  { color: "Blue", number: 9 },
];

let yellowNumCardsArr = [
  { color: "Yellow", number: 0 },
  { color: "Yellow", number: 1 },
  { color: "Yellow", number: 2 },
  { color: "Yellow", number: 3 },
  { color: "Yellow", number: 4 },
  { color: "Yellow", number: 5 },
  { color: "Yellow", number: 6 },
  { color: "Yellow", number: 7 },
  { color: "Yellow", number: 8 },
  { color: "Yellow", number: 9 },
  { color: "Yellow", number: 1 },
  { color: "Yellow", number: 2 },
  { color: "Yellow", number: 3 },
  { color: "Yellow", number: 4 },
  { color: "Yellow", number: 5 },
  { color: "Yellow", number: 6 },
  { color: "Yellow", number: 7 },
  { color: "Yellow", number: 8 },
  { color: "Yellow", number: 9 },
];

let specialCardArr = [
  { color: "Red", type: "Reverse" },
  { color: "Red", type: "Reverse" },
  { color: "Red", type: "Skip" },
  { color: "Red", type: "Skip" },
  { color: "Red", type: "Draw" },
  { color: "Red", type: "Draw" },
  { color: "Green", type: "Reverse" },
  { color: "Green", type: "Reverse" },
  { color: "Green", type: "Skip" },
  { color: "Green", type: "Skip" },
  { color: "Green", type: "Draw" },
  { color: "Green", type: "Draw" },
  { color: "Blue", type: "Reverse" },
  { color: "Blue", type: "Reverse" },
  { color: "Blue", type: "Skip" },
  { color: "Blue", type: "Skip" },
  { color: "Blue", type: "Draw" },
  { color: "Blue", type: "Draw" },
  { color: "Yellow", type: "Reverse" },
  { color: "Yellow", type: "Reverse" },
  { color: "Yellow", type: "Skip" },
  { color: "Yellow", type: "Skip" },
  { color: "Yellow", type: "Draw" },
  { color: "Yellow", type: "Draw" },
];

let wildCardsArr = [
  { color: "Black", type: "Wild card" },
  { color: "Black", type: "Wild card" },
  { color: "Black", type: "Wild card" },
  { color: "Black", type: "Wild card" },
  { color: "Black", type: "Wild card4" },
  { color: "Black", type: "Wild card4" },
  { color: "Black", type: "Wild card4" },
  { color: "Black", type: "Wild card4" },
];

///////////////////////////////////creating a randomize deck of cards from the Data//////////////////////////////

const shuffle = (redNum, yellowNum, blueNum, greenNum, special, wild) => {
  let shuffledArr = [];
  let start = 0;

  while (
    redNum.length !== 0 &&
    yellowNum.length !== 0 &&
    blueNum.length !== 0 &&
    greenNum
  ) {
    shuffledArr.push(...blueNum.splice(start, 1));
    shuffledArr.unshift(...redNum.splice(-start, 1));
    shuffledArr.push(...yellowNum.splice(start, 1));
    shuffledArr.unshift(...greenNum.splice(-start, 1));
    start += 3;
    if (start >= redNum.length) start = 0;
  }

  start = 0;
  while (special.length !== 0) {
    let random = Math.floor(Math.random() * (18 - 8) + 8 + 1);
    if (start % 2 == 0) {
      shuffledArr.splice(start + random, 0, ...special.splice(start, 1));
    } else {
      shuffledArr.splice(-start - random, 0, ...special.splice(-start, 1));
    }
    start++;
    if (start >= special.length) start = 0;
  }

  start = 0;
  while (wild.length !== 0) {
    let random = Math.floor(Math.random() * (20 - 10) + 10 + 1);
    if (start % 2 == 0) {
      shuffledArr.splice(start + random, 0, ...wild.splice(start, 1));
    } else {
      shuffledArr.splice(-start - random, 0, ...wild.splice(-start, 1));
    }
    start++;
    if (start >= wild.length) start = 0;
  }
  return shuffledArr;
};

////////////////////////////////////// again shuffling the deck to get more randomize results///////////////////////////////

function againShuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return [...array];
}

const finalDeck = shuffle(
  redNumCardsArr,
  yellowNumCardsArr,
  blueNumCardsArr,
  greenNumCardsArr,
  specialCardArr,
  wildCardsArr
);
