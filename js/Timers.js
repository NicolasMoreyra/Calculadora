var timerElement = document.getElementById('timer');
var seconds = 0;
var timerInterval;

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  seconds = 0;
  updateTimer();
}

function updateTimer() {
  seconds++;
  timerElement.textContent = formatTime(seconds);
}

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}