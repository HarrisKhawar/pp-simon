var level = 1;
var randomBtn;
var order = [];
var userOrder = [];
var audio;

var startButton = $(".btn-start");

// Button Click Listeners
startButton.on("click", startClick);

//Start Showing Order
function startClick() {

  var wait = (level + 3) * 1000; //wait time for GO!

  for (var i = 0; i < level + 2; i++) {

    setTimeout(function() {
      showOrder()
    }, (i + 1) * 1000);
  }

  //turn off startButton
  startButton.off("click", startClick);
  startButton.removeClass("cursorChange activeChange");

  //prompt user to go
  setTimeout(function() {
    $("h2").text("GO!");
    $(".btn").on("click", handleButton);
  }, wait);
}

//Change Each Button in Order
function showOrder() {

  randomBtn = Math.ceil(Math.random() * 4); //generate Random

  // Assign audio file
  switch(randomBtn) {
    case 1:
      audio = new Audio("sounds/hollywood.mp3");
      break;
    case 2:
      audio = new Audio("sounds/oh_my_gad.mp3");
      break;
    case 3:
      audio = new Audio("sounds/yeah.mp3");
      break;
    case 4:
      audio = new Audio("sounds/straigh_up.mp3");
      break;
  }
  audio.play(); // play audio

  var randomBtnClass = ".btn-" + randomBtn; //get random Button

  order.push(randomBtn.toString());

  $(randomBtnClass).addClass("btn-pressed"); //change appearance

  setTimeout(function() {
    $(randomBtnClass).removeClass("btn-pressed"); //reset appearance
  }, 500);
}

//Log User Pressed Button
function handleButton() {

  var pressedBtn = this; // hold pressed button
  var pressedBtnNum = $(this).attr('name'); // hold pressed button's number

  // Add audio file
  switch(pressedBtnNum) {
    case "1":
      audio = new Audio("sounds/hollywood.mp3");
      break;
    case "2":
      audio = new Audio("sounds/oh_my_gad.mp3");
      break;
    case "3":
      audio = new Audio("sounds/yeah.mp3");
      break;
    case "4":
      audio = new Audio("sounds/straigh_up.mp3");
      break;
  }
  audio.play(); // play audio

  userOrder.push(pressedBtnNum);

  $(pressedBtn).addClass("btn-pressed"); //change appearance

  setTimeout(function() {
    $(pressedBtn).removeClass("btn-pressed"); //reset appearance
  }, 200);

  if (userOrder.length == order.length) { //check User Order
    $(".btn").off("click", handleButton);
    checkOrder();
  }
}

//Compare orders
function checkOrder() {

  var check = true;

  //check each case
  for (var i = 0; i < order.length; i++) {

    if (order[i] != userOrder[i]) {
      check = false;
    }
  }

  //show result of comparison
  if (check) {
    $("h2").text("great!");
    setTimeout(function() {
      $("h2").text("click here to start");
    }, 1000)
  } else {
    $("h2").text("you made a mistake!");
    setTimeout(function() {
      $("h2").text("click here to try again");
    }, 1000)
  }

  //advance to next level
  if (check) level++;
  levelChange();

  //reset orders
  order = [];
  userOrder = [];

//turn on startButton
startButton.on("click", startClick);
startButton.addClass("cursorChange activeChange");
}

//Change Level
function levelChange() {
  $("h3").text("level " + level);
}
