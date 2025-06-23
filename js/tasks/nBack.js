document.addEventListener('DOMContentLoaded', () => {
    const nBackContainer = document.getElementById('n-back-container');
    if (!nBackContainer) return;

    // --- DATA & CONFIGURATION ---
    const nBackLetterData = {
        1: { name: "1-Back", instruction: "Press 'TARGET' if the current letter is the same as the letter that appeared 1 step back. Otherwise, press 'NON-TARGET'.", trials: [{s:'F',c:'NON-TARGET'},{s:'H',c:'NON-TARGET'},{s:'H',c:'TARGET'},{s:'J',c:'NON-TARGET'},{s:'K',c:'NON-TARGET'},{s:'K',c:'TARGET'},{s:'L',c:'NON-TARGET'},{s:'P',c:'NON-TARGET'},{s:'P',c:'TARGET'},{s:'T',c:'NON-TARGET'},{s:'R',c:'NON-TARGET'},{s:'R',c:'TARGET'},{s:'S',c:'NON-TARGET'},{s:'V',c:'NON-TARGET'},{s:'V',c:'TARGET'},{s:'X',c:'NON-TARGET'},{s:'X',c:'TARGET'},{s:'M',c:'NON-TARGET'},{s:'J',c:'NON-TARGET'},{s:'J',c:'TARGET'},{s:'Q',c:'NON-TARGET'},{s:'W',c:'NON-TARGET'},{s:'W',c:'TARGET'},{s:'Z',c:'NON-TARGET'},{s:'Y',c:'NON-TARGET'},{s:'Y',c:'TARGET'},{s:'N',c:'NON-TARGET'},{s:'B',c:'NON-TARGET'},{s:'B',c:'TARGET'},{s:'G',c:'NON-TARGET'}] },
        2: { name: "2-Back", instruction: "Press 'TARGET' if the current letter is the same as the letter from 2 steps back.", trials: [{s:'L',c:'NON-TARGET'},{s:'C',c:'NON-TARGET'},{s:'L',c:'TARGET'},{s:'K',c:'NON-TARGET'},{s:'G',c:'NON-TARGET'},{s:'K',c:'TARGET'},{s:'H',c:'NON-TARGET'},{s:'G',c:'TARGET'},{s:'P',c:'NON-TARGET'},{s:'H',c:'TARGET'},{s:'B',c:'NON-TARGET'},{s:'P',c:'TARGET'},{s:'B',c:'TARGET'},{s:'T',c:'NON-TARGET'},{s:'M',c:'NON-TARGET'},{s:'T',c:'TARGET'},{s:'K',c:'NON-TARGET'},{s:'G',c:'NON-TARGET'},{s:'K',c:'TARGET'},{s:'P',c:'NON-TARGET'},{s:'K',c:'TARGET'},{s:'S',c:'NON-TARGET'},{s:'A',c:'NON-TARGET'},{s:'S',c:'TARGET'},{s:'D',c:'NON-TARGET'},{s:'F',c:'NON-TARGET'},{s:'D',c:'TARGET'},{s:'Z',c:'NON-TARGET'},{s:'X',c:'NON-TARGET'},{s:'C',c:'NON-TARGET'}] },
        3: { name: "3-Back", instruction: "Press 'TARGET' if the current letter is the same as the letter from 3 steps back.", trials: [{s:'R',c:'NON-TARGET'},{s:'T',c:'NON-TARGET'},{s:'S',c:'NON-TARGET'},{s:'R',c:'TARGET'},{s:'M',c:'NON-TARGET'},{s:'S',c:'TARGET'},{s:'P',c:'NON-TARGET'},{s:'M',c:'TARGET'},{s:'L',c:'NON-TARGET'},{s:'P',c:'TARGET'},{s:'M',c:'NON-TARGET'},{s:'L',c:'TARGET'},{s:'F',c:'NON-TARGET'},{s:'Q',c:'NON-TARGET'},{s:'F',c:'TARGET'},{s:'L',c:'NON-TARGET'},{s:'H',c:'NON-TARGET'},{s:'F',c:'TARGET'},{s:'H',c:'NON-TARGET'},{s:'H',c:'TARGET'},{s:'V',c:'NON-TARGET'},{s:'H',c:'TARGET'},{s:'C',c:'NON-TARGET'},{s:'V',c:'TARGET'},{s:'B',c:'NON-TARGET'},{s:'N',c:'NON-TARGET'},{s:'M',c:'NON-TARGET'},{s:'B',c:'TARGET'},{s:'Y',c:'NON-TARGET'},{s:'T',c:'NON-TARGET'}] }
    };
    const nBackDigitData = {
        1: { name: "1-Back", instruction: "Press 'TARGET' if the current number is the same as the number that appeared 1 step back. Otherwise, press 'NON-TARGET'.", trials: [{s:'5',c:'NON-TARGET'},{s:'8',c:'NON-TARGET'},{s:'8',c:'TARGET'},{s:'2',c:'NON-TARGET'},{s:'4',c:'NON-TARGET'},{s:'4',c:'TARGET'},{s:'1',c:'NON-TARGET'},{s:'9',c:'NON-TARGET'},{s:'9',c:'TARGET'},{s:'3',c:'NON-TARGET'},{s:'6',c:'NON-TARGET'},{s:'6',c:'TARGET'},{s:'7',c:'NON-TARGET'},{s:'0',c:'NON-TARGET'},{s:'0',c:'TARGET'},{s:'5',c:'NON-TARGET'},{s:'5',c:'TARGET'},{s:'3',c:'NON-TARGET'},{s:'1',c:'NON-TARGET'},{s:'1',c:'TARGET'},{s:'4',c:'NON-TARGET'},{s:'2',c:'NON-TARGET'},{s:'2',c:'TARGET'},{s:'9',c:'NON-TARGET'},{s:'8',c:'NON-TARGET'},{s:'8',c:'TARGET'},{s:'0',c:'NON-TARGET'},{s:'7',c:'NON-TARGET'},{s:'7',c:'TARGET'},{s:'3',c:'NON-TARGET'}] },
        2: { name: "2-Back", instruction: "Press 'TARGET' if the current number is the same as the number from 2 steps back.", trials: [{s:'3',c:'NON-TARGET'},{s:'8',c:'NON-TARGET'},{s:'3',c:'TARGET'},{s:'5',c:'NON-TARGET'},{s:'1',c:'NON-TARGET'},{s:'5',c:'TARGET'},{s:'9',c:'NON-TARGET'},{s:'1',c:'TARGET'},{s:'2',c:'NON-TARGET'},{s:'9',c:'TARGET'},{s:'4',c:'NON-TARGET'},{s:'2',c:'TARGET'},{s:'4',c:'TARGET'},{s:'6',c:'NON-TARGET'},{s:'7',c:'NON-TARGET'},{s:'6',c:'TARGET'},{s:'5',c:'NON-TARGET'},{s:'1',c:'NON-TARGET'},{s:'5',c:'TARGET'},{s:'2',c:'NON-TARGET'},{s:'5',c:'TARGET'},{s:'8',c:'NON-TARGET'},{s:'9',c:'NON-TARGET'},{s:'8',c:'TARGET'},{s:'1',c:'NON-TARGET'},{s:'3',c:'NON-TARGET'},{s:'1',c:'TARGET'},{s:'0',c:'NON-TARGET'},{s:'2',c:'NON-TARGET'},{s:'4',c:'NON-TARGET'}] },
        3: { name: "3-Back", instruction: "Press 'TARGET' if the current number is the same as the number from 3 steps back.", trials: [{s:'7',c:'NON-TARGET'},{s:'1',c:'NON-TARGET'},{s:'4',c:'NON-TARGET'},{s:'7',c:'TARGET'},{s:'2',c:'NON-TARGET'},{s:'4',c:'TARGET'},{s:'8',c:'NON-TARGET'},{s:'2',c:'TARGET'},{s:'5',c:'NON-TARGET'},{s:'8',c:'TARGET'},{s:'2',c:'NON-TARGET'},{s:'5',c:'TARGET'},{s:'9',c:'NON-TARGET'},{s:'3',c:'NON-TARGET'},{s:'9',c:'TARGET'},{s:'5',c:'NON-TARGET'},{s:'6',c:'NON-TARGET'},{s:'9',c:'TARGET'},{s:'6',c:'NON-TARGET'},{s:'6',c:'TARGET'},{s:'0',c:'NON-TARGET'},{s:'6',c:'TARGET'},{s:'1',c:'NON-TARGET'},{s:'0',c:'TARGET'},{s:'4',c:'NON-TARGET'},{s:'3',c:'NON-TARGET'},{s:'8',c:'NON-TARGET'},{s:'4',c:'TARGET'},{s:'2',c:'NON-TARGET'},{s:'1',c:'NON-TARGET'}] }
    };

    const instructionsDiv = document.getElementById('n-back-instructions');
    const taskAreaDiv = document.getElementById('n-back-task-area');
    const completionDiv = document.getElementById('n-back-completion');
    const stimulusDisplay = document.getElementById('stimulus-display');
    const startBtn = document.getElementById('start-n-back-btn');
    const titleEl = document.getElementById('n-back-title');
    const instructionTextEl = document.getElementById('n-back-instruction-text');

    let currentLevel = 1;
    let trials;
    let trialIndex = 0;
    let stimulusHistory = [];
    let canRespond = false;
    let stimulusStartTime = 0;
    let taskData;
    let taskIdentifier = '';

    function initializeTask() {
        const path = window.location.pathname;
        // FIXED: Changed this condition to match the actual filename 'nBackDigit.html'
        if (path.includes('nBackDigit.html')) {
            taskData = nBackDigitData;
            taskIdentifier = 'nBackDigit';
            titleEl.textContent = 'Task 1 (Round 2): N-Back Digits';
        } else {
            taskData = nBackLetterData;
            taskIdentifier = 'nBackLetter';
            titleEl.textContent = 'Task 1: N-Back Letters';
        }
        setupNextLevel();
    }

    function setupNextLevel() {
        if (currentLevel > 3) {
            showFinalCompletion();
            return;
        }
        startEvent(`NBack_Level_${currentLevel}_Instructions`, 'Instruction_View');
        const levelData = taskData[currentLevel];
        instructionTextEl.textContent = levelData.instruction;
        startBtn.textContent = `Start Level ${currentLevel}: ${levelData.name}`;
        taskAreaDiv.style.display = 'none';
        completionDiv.style.display = 'none';
        instructionsDiv.style.display = 'block';
    }

    function startLevel() {
        endEvent(`NBack_Level_${currentLevel}_Instructions`);
        startEvent(`NBack_Level_${currentLevel}_Quiz`, 'Trial_Sequence');
        instructionsDiv.style.display = 'none';
        taskAreaDiv.style.display = 'block';
        trials = taskData[currentLevel].trials;
        trialIndex = 0;
        stimulusHistory = [];
        runNextTrial();
    }

    function runNextTrial() {
        if (trialIndex >= trials.length) {
            endLevel();
            return;
        }
        canRespond = false;
        stimulusDisplay.textContent = '';
        stimulusDisplay.innerHTML = '<div class="fixation-cross" style="font-size: 4rem; color: inherit;">+</div>';
        setTimeout(() => {
            const currentStimulus = trials[trialIndex].s;
            stimulusDisplay.classList.remove('stimulus-animate');
            void stimulusDisplay.offsetWidth;
            stimulusDisplay.textContent = currentStimulus;
            stimulusDisplay.classList.add('stimulus-animate');
            stimulusHistory.push(currentStimulus);
            canRespond = true;
            stimulusStartTime = performance.now();
        }, 500);
    }

    function handleResponse(userAnswer) {
        if (!canRespond) return;
        canRespond = false;
        const responseTime = Math.round(performance.now() - stimulusStartTime);
        const correctAnswer = trials[trialIndex].c;
        const isCorrect = userAnswer === correctAnswer;
        
        const trialData = {
            participantId: sessionStorage.getItem('participantId'),
            sessionId: sessionStorage.getItem('sessionId'),
            taskType: taskIdentifier,
            level: currentLevel,
            trial: trialIndex + 1,
            stimulus: trials[trialIndex].s,
            response: userAnswer,
            correct: isCorrect ? 1 : 0,
            responseTime: responseTime
        };
        submitNBackData(trialData);
        
        trialIndex++;
        setTimeout(runNextTrial, 750);
    }
    
    function submitNBackData(data) {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            const entryId = NBACK_FORM_ENTRIES[key];
            if (entryId) {
                formData.append(entryId, data[key]);
            }
        });
        fetch(NBACK_FORM_URL, { method: 'POST', body: formData, mode: 'no-cors' }).catch(console.error);
    }

    function endLevel() {
        endEvent(`NBack_Level_${currentLevel}_Quiz`);
        currentLevel++;
        setupNextLevel();
    }

    function showFinalCompletion() {
        taskAreaDiv.style.display = 'none';
        completionDiv.style.display = 'block';
    }

    startBtn.addEventListener('click', startLevel);
    document.querySelectorAll('.response-btn').forEach(button => {
        button.addEventListener('click', () => {
            handleResponse(button.dataset.answer);
        });
    });

    initializeTask();
});