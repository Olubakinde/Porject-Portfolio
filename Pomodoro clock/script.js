let timer;
let isRunning = false;
let isSession = true;
let sessionLength = 25;
let breakLength = 5;
let timeLeft = sessionLength * 60;
let alarmTime;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const sessionInput = document.getElementById('session');
const breakInput = document.getElementById('break');
const currentTimeDisplay = document.getElementById('current-time');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.getElementById('set-alarm');

function updateTimeDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
            timeLeft--;
            updateTimeDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                isSession = !isSession;
                timeLeft = (isSession ? sessionLength : breakLength) * 60;
                alert(isSession ? 'Session over! Time for a break.' : 'Break over! Time to get back to work.');
                startTimer();
            }
        }, 1000);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isSession = true;
    sessionLength = parseInt(sessionInput.value);
    breakLength = parseInt(breakInput.value);
    timeLeft = sessionLength * 60;
    updateTimeDisplay();
}

function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    currentTimeDisplay.textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (alarmTime && `${hours}:${minutes}` === alarmTime) {
        alert('Alarm ringing!');
        alarmTime = null;
    }
}

function setAlarm() {
    const time = alarmTimeInput.value;
    if (time) {
        alarmTime = time;
        alert(`Alarm set for ${time}`);
    }
}

function switchTab(event) {
    const targetId = event.target.dataset.target;
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector(targetId).classList.add('active');

    // Update section title dynamically
    const sectionTitle = document.querySelector('.container h1');
    switch (targetId) {
        case '#pomodoro':
            sectionTitle.textContent = 'Pomodoro Clock';
            break;
        case '#clock':
            sectionTitle.textContent = 'Clock';
            break;
        case '#alarm':
            sectionTitle.textContent = 'Alarm';
            break;
        default:
            sectionTitle.textContent = 'Pomodoro Clock';
            break;
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
setAlarmButton.addEventListener('click', setAlarm);
sessionInput.addEventListener('change', () => {
    sessionLength = parseInt(sessionInput.value);
    if (!isRunning && isSession) {
        timeLeft = sessionLength * 60;
        updateTimeDisplay();
    }
});
breakInput.addEventListener('change', () => {
    breakLength = parseInt(breakInput.value);
    if (!isRunning && !isSession) {
        timeLeft = breakLength * 60;
        updateTimeDisplay();
    }
});
document.querySelectorAll('.tab-button').forEach(button => button.addEventListener('click', switchTab));

setInterval(updateCurrentTime, 1000);
updateTimeDisplay();
