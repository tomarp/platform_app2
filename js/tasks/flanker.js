document.addEventListener('DOMContentLoaded', () => {
    const flankerContainer = document.getElementById('flanker-container');
    if (!flankerContainer) return;

    // --- DATA & CONFIGURATION ---
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    // --- DOM ELEMENTS ---
    const instructionsDiv = document.getElementById('flanker-instructions');
    const taskAreaDiv = document.getElementById('flanker-task-area');
    const completionDiv = document.getElementById('flanker-completion');
    const startBtn = document.getElementById('start-flanker-btn');
    const titleEl = document.getElementById('flanker-title');
    const instructionTextEl = document.getElementById('flanker-instruction-text');
    const stimulusEl = document.getElementById('flanker-stimulus');
    const responseArea = document.getElementById('flanker-response-area');

    // --- STATE MANAGEMENT ---
    let trials = [];
    let currentTrialIndex = 0;
    let stimulusStartTime = 0;
    let isDigitTask = false;

    // --- CORE LOGIC ---
    function initializeTask() {
        const path = window.location.pathname;
        if (path.includes('flankerDigit.html')) {
            isDigitTask = true;
            setupDigitTask();
        } else {
            isDigitTask = false;
            setupArrowTask();
        }
        startBtn.addEventListener('click', startBlock);
    }
    
    function setupArrowTask() {
        titleEl.textContent = 'Task 4: Arrow Flanker Task';
        instructionTextEl.innerHTML = `<p class="instruction-emphasis">Your task is to identify the direction of the <strong>middle arrow</strong>. Ignore the other arrows.</p><p>Use the buttons to indicate your choice.</p>`;
        responseArea.innerHTML = `<button class="flanker-response-btn" data-response="Left">&larr; Left</button><button class="flanker-response-btn" data-response="Right">Right &rarr;</button>`;
        trials = generateArrowTrials();
    }

    function setupDigitTask() {
        titleEl.textContent = 'Task 4 (Round 2): Digit Flanker Task';
        instructionTextEl.innerHTML = `<p class="instruction-emphasis">Your task is to identify if the <strong>middle number</strong> is <strong>EVEN or ODD</strong>. Ignore the other numbers.</p><p>Use the buttons to indicate your choice.</p>`;
        responseArea.innerHTML = `<button class="flanker-response-btn" data-response="Even">Even</button><button class="flanker-response-btn" data-response="Odd">Odd</button>`;
        trials = generateNumberTrials();
    }

    function generateArrowTrials() {
        const trialList = [];
        const targets = ['<', '>'];
        const conditions = ['Congruent', 'Incongruent', 'Neutral'];
        for (let i = 0; i < 15; i++) {
            const target = targets[Math.floor(Math.random() * targets.length)];
            const condition = conditions[i % 3];
            let stimulus = '';
            let correctResponse = (target === '<') ? 'Left' : 'Right';
            switch (condition) {
                case 'Congruent': stimulus = `${target}${target}${target}${target}${target}`; break;
                case 'Incongruent': const flanker = (target === '<') ? '>' : '<'; stimulus = `${flanker}${flanker}${target}${flanker}${flanker}`; break;
                case 'Neutral': stimulus = `+ + ${target} + +`; break;
            }
            trialList.push({ taskType: 'Flanker-Arrow', condition, stimulus, target, correctResponse });
        }
        return shuffle(trialList);
    }

    function generateNumberTrials() {
        const trialList = [];
        const numbers = [2, 3, 4, 5, 6, 7, 8, 9];
        const conditions = ['Congruent', 'Incongruent', 'Neutral'];
        for (let i = 0; i < 15; i++) {
            const target = numbers[Math.floor(Math.random() * numbers.length)];
            const isTargetEven = target % 2 === 0;
            const condition = conditions[i % 3];
            let flankers = [];
            let correctResponse = isTargetEven ? 'Even' : 'Odd';
            switch (condition) {
                case 'Congruent': flankers = numbers.filter(n => (n % 2 === 0) === isTargetEven && n !== target); break;
                case 'Incongruent': flankers = numbers.filter(n => (n % 2 === 0) !== isTargetEven); break;
                case 'Neutral': flankers = ['#', '#']; break;
            }
            const flanker = flankers[Math.floor(Math.random() * flankers.length)];
            const stimulus = `${flanker} ${flanker} ${target} ${flanker} ${flanker}`;
            trialList.push({ taskType: 'Flanker-Number', condition, stimulus, target: target.toString(), correctResponse });
        }
        return shuffle(trialList);
    }

    function startBlock() {
        instructionsDiv.style.display = 'none';
        taskAreaDiv.style.display = 'block';
        currentTrialIndex = 0;
        responseArea.querySelectorAll('.flanker-response-btn').forEach(button => button.addEventListener('click', handleResponse));
        runNextTrial();
    }

    function runNextTrial() {
        if (currentTrialIndex >= trials.length) {
            showFinalCompletion();
            return;
        }
        stimulusEl.innerHTML = '<div class="fixation-cross" style="font-size: 4rem; color: inherit;">+</div>';
        responseArea.querySelectorAll('.flanker-response-btn').forEach(b => b.disabled = true);
        
        setTimeout(() => {
            stimulusEl.textContent = trials[currentTrialIndex].stimulus;
            stimulusStartTime = performance.now();
            responseArea.querySelectorAll('.flanker-response-btn').forEach(b => b.disabled = false);
        }, 500);
    }

    function handleResponse(event) {
        responseArea.querySelectorAll('.flanker-response-btn').forEach(b => b.disabled = true);
        const reactionTime = Math.round(performance.now() - stimulusStartTime);
        const trial = trials[currentTrialIndex];
        const userResponse = event.target.dataset.response;
        const accuracy = (userResponse === trial.correctResponse) ? 1 : 0;
        
        const trialData = {
            participantId: sessionStorage.getItem('participantId'),
            sessionId: sessionStorage.getItem('sessionId'),
            taskType: trial.taskType,
            condition: trial.condition,
            stimulus: trial.stimulus,
            target: trial.target,
            userResponse: userResponse,
            accuracy: accuracy,
            reactionTime: reactionTime
        };
        submitFlankerData(trialData);
        
        stimulusEl.innerHTML = '';
        setTimeout(() => {
            currentTrialIndex++;
            runNextTrial();
        }, 1000);
    }

    // FIXED: Updated the data submission to use the reliable Google Apps Script method
    function submitFlankerData(data) {
        // Note: taskType is already part of the data object from the trial generation
        fetch(WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            if (data.result !== 'success') {
                console.error('Error writing Flanker data to spreadsheet:', data.error);
            }
        })
        .catch(error => {
            console.error('Error submitting Flanker data:', error);
        });
    }

    function showFinalCompletion() {
        taskAreaDiv.style.display = 'none';
        completionDiv.style.display = 'block';
    }

    // --- INITIALIZATION ---
    initializeTask();
});