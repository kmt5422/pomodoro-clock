(function(){
    const btnSessionMinus = document.querySelector('.btn-session-minus');
    const btnSessionPlus = document.querySelector('.btn-session-plus');
    const sessionLength = document.querySelector('.session-length');
    const btnBreakMinus = document.querySelector('.btn-break-minus');
    const btnBreakPlus = document.querySelector('.btn-break-plus');
    const breakLength = document.querySelector('.break-length');
    const timerTime = document.querySelector('.timer-time');
    let time = {minutes: Number(timerTime.textContent.split(':')[0]), seconds: Number(timerTime.textContent.split(':')[1])};

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
        if (scale == 'minutes') {
            time.minutes += value;
        } else if (scale == 'seconds') {
            time.seconds += scale;
        }
        timerTime.textContent = `${time.minutes}:${time.seconds > 9 ? time.seconds : "0" + time.seconds}`;
    }
})();