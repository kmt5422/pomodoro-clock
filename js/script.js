(function(){
    const btnSessionMinus = document.querySelector('.btn-session-minus');
    const btnSessionPlus = document.querySelector('.btn-session-plus');
    const sessionLength = document.querySelector('.session-length');
    const btnBreakMinus = document.querySelector('.btn-break-minus');
    const btnBreakPlus = document.querySelector('.btn-break-plus');
    const breakLength = document.querySelector('.break-length');
    const timerTime = document.querySelector('.timer-time');
    const timerHeading = document.querySelector('.timer-session-heading');
    const playBtn = document.querySelector('.play');
    const stopBtn = document.querySelector('.stop');
    const pauseBtn = document.querySelector('.pause');
    const resetBtn = document.querySelector('.reset');
    let time = {minutes: Number(timerTime.textContent.split(':')[0]), seconds: Number(timerTime.textContent.split(':')[1])};
    const state = {currState: 'pause', currSession: 'session'};

    // EVENT LISTENERS
    btnSessionMinus.addEventListener('click', () => {
        updateTargetLength(sessionLength, -1);
        updateTimerLength('minutes', -1);

    });
    btnSessionPlus.addEventListener('click', () => {
        updateTargetLength(sessionLength, 1)
        updateTimerLength('minutes', 1);
    });
    btnBreakMinus.addEventListener('click', () => updateTargetLength(breakLength, -1));
    btnBreakPlus.addEventListener('click', () => updateTargetLength(breakLength, 1));
    playBtn.addEventListener('click', () => state.currState = 'play');
    stopBtn.addEventListener('click', function(){
        if(state.currSession == 'session') {
            state.currSession = 'break';
            state.currState = 'pause';
            time.minutes = Number(breakLength.textContent);
            time.seconds = 0;
            timerHeading.textContent = 'Break';
        } else {
            state.currSession = 'session';
            state.currState = 'pause';
            time.minutes = Number(sessionLength.textContent);
            time.seconds = 0;
            timerHeading.textContent = 'Session';
        }
        updateTimerLength('minutes', 0);
    });
    pauseBtn.addEventListener('click', () => state.currState = 'pause');
    resetBtn.addEventListener('click', () => {
        state.currSession = 'session';
        state.currState = 'pause';
        time.minutes = 25;
        sessionLength.textContent = 25;
        breakLength.textContent = 5;
        time.seconds = 0;
        timerHeading.textContent = 'Session';
        updateTimerLength('minutes', 0);
    });

    function updateTargetLength(target, value) {
        let currLength = Number(target.textContent) + value;
        if(currLength < 5) {
            currLength = 5
        } else if (currLength > 180) {
            currLength = 180;
        }
        target.textContent = currLength;
    }

    function updateTimerLength(scale, value) {
        if (time.minutes == 0 && time.seconds == 0) {
            stopBtn.click()
            return;
        }else if (scale == 'minutes') {
            time.minutes += value;
        } else if (scale == 'seconds') {
            if (time.seconds == 0) {
                time.seconds = 59;
                time.minutes -= 1;
            } else {
                time.seconds += value;
            }
        }
        timerTime.textContent = `${time.minutes}:${time.seconds > 9 ? time.seconds : "0" + time.seconds}`;
    }

    setInterval(function(){
        if (state.currState == 'play') {
            updateTimerLength('seconds', -1);
        }
    }, 1000);
})();