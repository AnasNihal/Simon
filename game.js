let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let started = false;
let level = 0;
let highScore = 0;
let soundEnabled = true;
let playerName = "";

// Session-based leaderboard
const leaderboard = [];

$("#start-btn").click(() => {
  const newName = $("#player-name").val().trim();
  if (!started && newName) {
    playerName = newName;
    $("#level-title").text(`Level ${level} - ${playerName}`);
    nextSequence();
    started = true;
    $("#player-name").prop("disabled", true);
  }
});

$(".btn").click(function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$("#sound-toggle").click(() => {
  soundEnabled = !soundEnabled;
  $("#sound-toggle").text(soundEnabled ? "🔊 Sound On" : "🔇 Sound Off");
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level").text(level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  if (!soundEnabled) return;
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Enter new name and click Start");

    if (level > highScore) {
      highScore = level;
      $("#high-score").text(highScore);
    }

    saveToLeaderboard(playerName, level);
    startOver();
  }
}

function saveToLeaderboard(name, score) {
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard.splice(5);
  updateLeaderboardUI();
}

function updateLeaderboardUI() {
  const list = $("#leaderboard-list");
  list.empty();
  leaderboard.forEach(entry => {
    list.append(`<li><strong>${entry.name}</strong> - ${entry.score}</li>`);
  });
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  playerName = "";
  $("#level").text("0");
  $("#player-name").prop("disabled", false).val("");
}
