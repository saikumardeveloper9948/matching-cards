let cards = document.querySelectorAll(".inner_card");
let firstClick = false;
let counter = 0;
let cardpairs = [];

cards.forEach((card, index) => {
  card.state = "unclicked";
  card.addEventListener("click", () => {
    if (!firstClick) {
      time();
    }
    firstClick = true;
    if (card.state === "unclicked") {
      card.style.transform = "rotateY(180deg)";
      card.state = "clicked";
      counter++;
      cardpairs.push(card);
      check();
    } else if (card.state === "clicked") {
      card.style.transform = "rotateY(0deg)";
      card.state = "unclicked";
      counter--;
      cardpairs = [];
    }
  });
});

shuffle();

function check() {
  if (counter == 2) {
    if (
      cardpairs[0].querySelector("img").src ==
      cardpairs[1].querySelector("img").src
    ) {
      matched();
    } else {
      unmatched(cardpairs[0], cardpairs[1]);
    }
  }
}

function matched() {
  cardpairs[0].state = "blocked";
  cardpairs[1].state = "blocked";
  counter = 0;
  cardpairs = [];
  let score = document.querySelector("#score").innerHTML;
  score++;
  document.querySelector("#score").innerHTML = score;
}

function unmatched(x, y) {
  setTimeout(() => {
    x.style.transform = "rotateY(0deg)";
    y.style.transform = "rotateY(0deg)";
  }, 750);
  cardpairs[0].state = "unclicked";
  cardpairs[1].state = "unclicked";
  counter = 0;
  cardpairs = [];
}

function time() {
  let secs = 0;
  let mins = 0;
  let SS;
  let MM;
  setInterval(() => {
    secs++;
    if (secs == 60) {
      mins++;
      secs = 0;
    }
    secs < 10 ? (SS = `0${secs}`) : (SS = `${secs}`);
    mins < 10 ? (MM = `0${mins}`) : (MM = `${mins}`);

    document.querySelector("#time").innerHTML = `${MM}:${SS}`;
  }, 1000);
}

// shuffle()

function shuffle() {
  // let cards = document.querySelectorAll('.inner-card')
  let images = document.querySelectorAll("img");
  let srcs = [
    "images/GIRL.webp",
    "images/man.jpeg",
    "images/monkey.jpg",
    "images/skull.png",
    "images/sun_rise.jpg",
    "images/Speech-50.jpg",
    "images/man.jpeg",
    "images/GIRL.webp",
    "images/Speech-50.jpg",
    "images/sun_rise.jpg",
    "images/skull.png",
    "images/monkey.jpg",
  ];

  for (i = srcs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i); //(i+1)
    let temp = srcs[i];
    srcs[i] = srcs[j];
    srcs[j] = temp;
  }

  for (i = 0; i < images.length; i++) {
    images[i].src = srcs[i];
  }
}

// if()