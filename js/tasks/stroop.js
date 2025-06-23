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
        { image: './media/stroop/alone_yellow.png', word: 'ALONE', colorName: 'Yellow' },
        { image: './media/stroop/anger_yellow.png', word: 'ANGER', colorName: 'Yellow' },
        { image: './media/stroop/blessing_red.png', word: 'BLESSING', colorName: 'Red' },
        { image: './media/stroop/book_yellow.png', word: 'BOOK', colorName: 'Yellow' },
        { image: './media/stroop/car_red.png', word: 'CAR', colorName: 'Red' },
        { image: './media/stroop/chair_green.png', word: 'CHAIR', colorName: 'Green' },
        { image: './media/stroop/clock_yellow.png', word: 'CLOCK', colorName: 'Yellow' },
        { image: './media/stroop/death_yellow.png', word: 'DEATH', colorName: 'Yellow' },
        { image: './media/stroop/fears_green.png', word: 'FEARS', colorName: 'Green' },
        { image: './media/stroop/fight_blue.png', word: 'FIGHT', colorName: 'Blue' },
        { image: './media/stroop/flower_blue.png', word: 'FLOWER', colorName: 'Blue' },
        { image: './media/stroop/glass_green.png', word: 'GLASS', colorName: 'Green' },
        { image: './media/stroop/goodluck_red.png', word: 'GOODLUCK', colorName: 'Red' },
        { image: './media/stroop/grief_yellow.png', word: 'GRIEF', colorName: 'Yellow' },
        { image: './media/stroop/happy_red.png', word: 'HAPPY', colorName: 'Red' },
        { image: './media/stroop/house_green.png', word: 'HOUSE', colorName: 'Green' },
        { image: './media/stroop/huggs_blue.png', word: 'HUGGS', colorName: 'Blue' },
        { image: './media/stroop/hurts_yellow.png', word: 'HURTS', colorName: 'Yellow' },
        { image: './media/stroop/joyful_green.png', word: 'JOYFUL', colorName: 'Green' },
        { image: './media/stroop/key_blue.png', word: 'KEY', colorName: 'Blue' },
        { image: './media/stroop/laugh_blue.png', word: 'LAUGH', colorName: 'Blue' },
        { image: './media/stroop/panic_green.png', word: 'PANIC', colorName: 'Green' },
        { image: './media/stroop/paper_blue.png', word: 'PAPER', colorName: 'Blue' },
        { image: './media/stroop/rainbow_yellow.png', word: 'RAINBOW', colorName: 'Yellow' },
        { image: './media/stroop/sadly_green.png', word: 'SADLY', colorName: 'Green' },
        { image: './media/stroop/smile_blue.png', word: 'SMILE', colorName: 'Blue' },
        { image: './media/stroop/stone_blue.png', word: 'STONE', colorName: 'Blue' },
        { image: './media/stroop/storm_blue.png', word: 'STORM', colorName: 'Blue' },
        { image: './media/stroop/sunny_blue.png', word: 'SUNNY', colorName: 'Blue' },
        { image: './media/stroop/window_green.png', word: 'WINDOW', colorName: 'Green' },
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
                wordImage.style.maxHeight = '250px';
                wordImage.style.display = 'block';
            } else {
                wordDisplay.textContent = trial.word;
                wordDisplay.style.color = trial.colorHex;
                wordDisplay.style.fontSize = '7rem'; 
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

    // REVERTED: This function now submits data directly to the Stroop Google Form.
    function submitStroopData(data) {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            const entryId = STROOP_FORM_ENTRIES[key];
            if (entryId) {
                formData.append(entryId, data[key]);
            }
        });

        fetch(STROOP_FORM_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        }).catch(console.error);
    }

    function showFinalCompletion() {
        taskAreaDiv.style.display = 'none';
        completionDiv.style.display = 'block';
    }

    // --- INITIALIZATION ---
    initializeTask();
});