window.onload = function() {
    
    //Start button clicked
    var startElement = document.getElementById('start');
    var pauseElement = document.getElementById('pause');
    startElement.addEventListener('click', function() {
    //Change 'Start' to 'Pause'
    startElement.style.visibility = 'hidden';
    pauseElement.style.visibility = 'visible';
    //Hide time setting and task input element
    var timeSettings = document.getElementsByClassName('timeSettings');
    for(var i = 0; i<timeSettings.length; i++) {
        timeSettings[i].style.display = 'none';
    }
    var task = document.getElementById('task');
    task.style.visibility = 'hidden';
        
    //Show the active task
    var inputTask = task.value;
    var activeTask = document.getElementById('active-task');
    activeTask.innerHTML = inputTask;
    activeTask.style.visibility = 'visible';

    //Time Display
    var sessionTime = document.getElementById('sessionTime');
    var count = sessionTime.value;
    var breakTime = document.getElementById('breakTime');
    var breakCount = breakTime.value;
    var timeDisplay = document.getElementById('timeDisplay');
    timeDisplay.innerHTML = count;
    
    //Set timer
    var audio = document.getElementById('buzzer');
    var countdown = setInterval(activeTimer, 1000);
    count = count*60; 
    var breakCounter = breakCount*60;
    var breakCountdown;
    function activeTimer() {
       count = count - 1;
    
       if(count===0) {
        audio.play();
        timeDisplay.innerHTML = breakCount;
        activeTask.innerHTML = 'Break';
        clearInterval(countdown);
        breakCountdown = setInterval(breakTimer,1000);
        } else if(count%60 >= 10) {
        timeDisplay.innerHTML = Math.floor(count/60) + ':' + count%60;
        } else {
        timeDisplay.innerHTML = Math.floor(count/60) + ':' + '0' + count%60;
        }
        
    }
    //Pause button clicked
    var isPaused = false;
     var flagBreak;
    if(isPaused===false) {
        pauseElement.addEventListener('click', function() {
            if(flagBreak===true) {
                clearInterval(breakCountdown);
                timeDisplay.innerHTML = Math.floor(breakCounter/60) + ':' + breakCounter%60;
            } else {
                clearInterval(countdown);
                timeDisplay.innerHTML = Math.floor(count/60) + ':' + count%60;
            }
        isPaused = true;
    });
    }
    //Resume button clicked
    var resumeElement = document.getElementById('resume');
    resumeElement.addEventListener('click', function() {
        if(flagBreak===true) {
            breakCountdown = setInterval(breakTimer, 1000);
        } else {
            countdown = setInterval(activeTimer,1000);
        }
        isPaused = false;
    });
    
    //Stop button clicked
    var stopElement = document.getElementById('stop');
    stopElement.addEventListener('click', function() {
        clearInterval(countdown);
        clearInterval(breakCountdown);
        window.location.reload(true);
    });

    function breakTimer() {
        breakCounter = breakCounter - 1;
        flagBreak = true;
        if(breakCounter===0) {
           audio.play();
           clearInterval(breakCountdown);
           window.location.reload(true);
            flagBreak = false;
        } else if(breakCounter%60 >= 10) {
        timeDisplay.innerHTML = Math.floor(breakCounter/60) + ':' + breakCounter%60;
        } else {
        timeDisplay.innerHTML = Math.floor(breakCounter/60) + ':' + '0' + breakCounter%60;
        } 
    }
    
    
});
    
    
}