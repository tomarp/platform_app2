document.addEventListener('DOMContentLoaded', () => {
    const stroopContainer = document.getElementById('stroop-container');
    if (!stroopContainer) return;

    // --- DATA & CONFIGURATION ---
    const textStroopData = {
        colors: { 'Red': '#E74C3C', 'Green': '#2ECC71', 'Blue': '#3498DB', 'Yellow': '#F1C40F' },
        wordLists: {
            Positive: ['HAPPY', 'FLOWER', 'SMILE', 'BLESSING', 'SUNNY', 'GOODLUCK', 'LAUGH', 'HUGGS', 'JOYFUL', 'RAINBOW'],
            Negative: ['ANGER', 'STORM', 'ALONE', 'PANIC', 'GRIEF', 'SADLY', 'FIGHT', 'HURTS', 'DEATH', 'FEARS'],
            Neutral:  ['PAPER', 'HOUSE', 'WINDOW', 'CLOCK', 'KEY', 'CHAIR', 'BOOK', 'STONE', 'CAR', 'GLASS']
        }
    };
    
    const imageStroopData = [
        { image: 'media/stroop/alone.png', word: 'ALONE', colorName: 'Red' },
        { image: 'media/stroop/anger.png', word: 'ANGER', colorName: 'Yellow' },
        { image: 'media/stroop/blessing.png', word: 'BLESSING', colorName: 'Blue' },
        { image: 'media/stroop/book.png', word: 'BOOK', colorName: 'Green' },
        // ... Add 20-30 more trials for a robust task
    ];

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    // --- DOM ELEMENTS ---
    const instructionsDiv = document.getElementById('stroop-instructions');
    const taskAreaDiv = document.getElementById('stroop-task-area');
    const completionDiv = document.getElementById('stroop-completion');
    const startBtn = document.getElementById('start-stroop-btn');
    const responseButtons = document.querySelectorAll('.stroop-response-btn');
    const wordDisplay = document.getElementById('stroop-word-display');
    const wordImage = document.getElementById('stroop-word-image');
    const fixationSpinner = document.getElementById('fixation-spinner');
    const responseArea = document.getElementById('stroop-response-area');


    // --- STATE MANAGEMENT ---
    let trials = [];
    let currentTrialIndex = 0;
    let stimulusStartTime = 0;
    let isImageTask = false;

    // --- CORE LOGIC ---
    function initializeTask() {
        const path = window.location.pathname;
        if (path.includes('stroopWordImage.html')) {
            isImageTask = true;
            trials = shuffle(imageStroopData);
        } else {
            isImageTask = false;
            prepareTextTrials();
        }
        startBtn.addEventListener('click', startTask);
        responseButtons.forEach(button => { button.addEventListener('click', handleResponse); });
    }

    function prepareTextTrials() {
        let masterList = [];
        const { colors, wordLists } = textStroopData;
        for (const type in wordLists) {
            wordLists[type].forEach(word => {
                masterList.push({ word: word, type: type });
            });
        }
        trials = shuffle(masterList);
        trials.forEach(trial => {
            const randomColorName = shuffle(Object.keys(colors))[0];
            trial.colorName = randomColorName;
            trial.colorHex = colors[randomColorName];
        });
    }

    function startTask() {
        instructionsDiv.style.display = 'none';
        taskAreaDiv.style.display = 'flex';
        currentTrialIndex = 0;
        runNextTrial();
    }

    function runNextTrial() {
        if (currentTrialIndex >= trials.length) {
            showFinalCompletion();
            return;
        }

        if (wordDisplay) wordDisplay.style.display = 'none';
        if (wordImage) wordImage.style.display = 'none';
        if (responseArea) responseArea.style.display = 'none';
        responseButtons.forEach(button => button.disabled = true);
        if (fixationSpinner) fixationSpinner.style.display = 'block'; 

        setTimeout(() => {
            if (fixationSpinner) fixationSpinner.style.display = 'none';
            const trial = trials[currentTrialIndex];

            if (isImageTask) {
                wordImage.src = trial.image;
                // MODIFIED: Added a check and fallback default value to prevent errors.
                wordImage.style.maxHeight = (typeof TASK_STYLING !== 'undefined' && TASK_STYLING.stroopImageHeight) 
                    ? TASK_STYLING.stroopImageHeight 
                    : '250px'; 
                wordImage.style.display = 'block';
            } else {
                wordDisplay.textContent = trial.word;
                wordDisplay.style.color = trial.colorHex;
                // MODIFIED: Added a check and fallback default value to prevent errors.
                wordDisplay.style.fontSize = (typeof TASK_STYLING !== 'undefined' && TASK_STYLING.stroopWordFontSize) 
                    ? TASK_STYLING.stroopWordFontSize 
                    : '6rem'; 
                wordDisplay.style.display = 'block';
            }
            
            if (responseArea) responseArea.style.display = 'flex'; 

            stimulusStartTime = performance.now();
            responseButtons.forEach(button => button.disabled = false);
        }, 750);
    }

    function handleResponse(event) {
        responseButtons.forEach(button => button.disabled = true);
        const reactionTime = Math.round(performance.now() - stimulusStartTime);
        const trial = trials[currentTrialIndex];
        const userResponseColor = event.target.dataset.color;
        const accuracy = (userResponseColor === trial.colorName) ? 1 : 0;
        
        const trialData = {
            participantId: sessionStorage.getItem('participantId'),
            sessionId: sessionStorage.getItem('sessionId'),
            blockType: isImageTask ? 'Image' : (trial.type || 'Text'),
            word: trial.word,
            inkColor: trial.colorName,
            userResponse: userResponseColor,
            accuracy: accuracy,
            reactionTime: reactionTime
        };
        submitStroopData(trialData);
        
        if (wordDisplay) wordDisplay.textContent = '';
        if (wordImage) wordImage.src = '';

        setTimeout(() => {
            currentTrialIndex++;
            runNextTrial();
        }, 1000);
    }

    function submitStroopData(data) {
        // Add the taskType to the data object so our Apps Script knows where to put it
        data.taskType = 'Stroop'; 

        fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors' // Use standard 'cors' mode
        })
        .then(response => response.json())
        .then(data => {
            if (data.result !== 'success') {
                console.error('Error writing to spreadsheet:', data.error);
            }
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
    }

    function showFinalCompletion() {
        taskAreaDiv.style.display = 'none';
        completionDiv.style.display = 'block';
    }

    // --- INITIALIZATION ---
    initializeTask();
});