// ===================================================================================
//  MASTER CONFIGURATION
//  ACTION: Fill in the details for ALL THREE Google Forms below.
// ===================================================================================

// 1. CONFIGURATION FOR THE "EVENT LOG" FORM (Captures the experiment timeline)
const EVENT_LOG_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeUpX_llePa-vr9_RMMrCwyukVLy7QvsMTNB4IogVSek8GFiA/formResponse';
const EVENT_LOG_ENTRIES = {
    participantId:  'entry.1118875455', 
    sessionId:      'entry.1571563684', 
    eventType:      'entry.1398270943', 
    eventDetail:    'entry.1757838715', 
    startTime:      'entry.1948504345', 
    endTime:        'entry.2099027292', 
    duration:       'entry.1425310216'  
};

// 2. CONFIGURATION FOR THE "N-BACK DATA" FORM
const NBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScEZcoJz_IdRisVpE23ss-zWHC3QSEOjSQvy-vHiwx8ERZHIQ/formResponse';
const NBACK_FORM_ENTRIES = {
    participantId: 'entry.1113279189', 
    sessionId:     'entry.339432524', 
    level:         'entry.1435506100', 
    trial:         'entry.554278333', 
    stimulus:      'entry.764904442', 
    response:      'entry.653194521', 
    correct:       'entry.559207729', 
    responseTime:  'entry.514183285' 
};

// 3. CONFIGURATION FOR THE "STROOP TASK DATA" FORM
const STROOP_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdGAoR9veGaZ0BbcMvxXLkrfcKVt2XGfbIBYSdBygM6W43UKQ/formResponse';
const STROOP_FORM_ENTRIES = {
    participantId: 'entry.1164703844',
    sessionId:     'entry.696599391',
    blockType:     'entry.73932478',
    word:          'entry.2144586575',
    inkColor:      'entry.1743047020',
    userResponse:  'entry.1954450114',
    accuracy:      'entry.110425205',
    reactionTime:  'entry.1402026771'
};

// 4. NEW CONFIGURATION FOR THE "IMAGE VISUAL PROCESSING TASK DATA" FORM
const IMAGE_TASK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdhfpYSoDfp1p3DbMBzGtqX7KhFmAn7dT4qRYXBwvZ1Td6_JA/formResponse';
const IMAGE_TASK_FORM_ENTRIES = {
    participantId: 'entry.736385545',
    sessionId:     'entry.1326819775',
    imageName:     'entry.711691944',
    question:      'entry.1479384826',
    userResponse:  'entry.2047010352',
    isCorrect:     'entry.1499410862',
    responseTime:  'entry.1692700124'
};

// 4. PAGE-SPECIFIC TIMER CONFIGURATION (in seconds)
const pageTimers = {
    'survey1.html': 300, 'baseline_signals.html': 180, 'survey2_1.html': 600,
    'task1_1.html': 600, 'task2_1.html': 600, 'task3_1.html': 600, 'task4_1.html': 600,
    'survey2_2.html': 480, 'task1_2.html': 600, 'task2_2.html': 600,
    'task3_2.html': 600, 'task4_2.html': 600, 'survey2_3.html': 300
};

// 5. PAGE NAVIGATION MAP
const pageFlow = {
    'index.html': 'survey1.html', 'survey1.html': 'baseline_signals.html',
    'baseline_signals.html': 'survey2_1.html', 'survey2_1.html': 'task1_1.html',
    'task1_1.html': 'task2_1.html', 'task2_1.html': 'task3_1.html',
    'task3_1.html': 'task4_1.html', 'task4_1.html': 'survey2_2.html',
    'survey2_2.html': 'task1_2.html', 'task1_2.html': 'task2_2.html',
    'task2_2.html': 'task3_2.html', 'task3_2.html': 'task4_2.html',
    'task4_2.html': 'survey2_3.html', 'survey2_3.html': 'end.html'
};

// 6. HTML SNIPPETS FOR INJECTION
const themeToggleHTML = `<button id="theme-switch-btn" title="Toggle theme"><svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.894 17.894a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM5.106 17.894a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM6.106 5.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 111.06-1.06l-1.59-1.59a.75.75 0 010-1.06z" /></svg><svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.472-.948.75.75 0 01.82.162l.142.242a.75.75 0 01-.162.819A10.5 10.5 0 119.528 1.718z" clip-rule="evenodd" /></svg></button>`;
const logosHTML = `<div id="logo-top-center" class="logo-fixed"><img src="images/logo1.png" alt="Logo 1"></div><div id="logo-bottom-left" class="logo-fixed"><img src="images/logo2.png" alt="Logo 2"></div><div id="logo-bottom-center" class="logo-fixed"><img src="images/logo3.png" alt="Logo 3"></div><div id="logo-bottom-right" class="logo-fixed"><img src="images/logo4.png" alt="Logo 4"></div>`;

// ===================================================================================
//  CORE SCRIPT LOGIC (No need to edit below this line)
// ===================================================================================

/**
 * Creates a unique event type key based on the page filename.
 * This is the crucial fix to distinguish between task_1 and task_2.
 * @param {string} pageName - The filename of the current page.
 * @returns {string} The specific event type string for logging.
 */
function getEventTypeForPage(pageName) {
    if (pageName.includes('survey')) return `Survey_${pageName.match(/(\d+_\d+)/)[1] || '1'}`;
    if (pageName.includes('baseline')) return 'Baseline';
    if (pageName.includes('task1')) return `NBack_Task_${pageName.match(/(\d+_\d+)/)[1]}`;
    if (pageName.includes('task2')) return `Stroop_Task_${pageName.match(/(\d+_\d+)/)[1]}`;
    if (pageName.includes('task3')) return `Image_Task_${pageName.match(/(\d+_\d+)/)[1]}`;
    if (pageName.includes('task4')) return `Task_4_${pageName.match(/(\d+_\d+)/)[1]}`;
    if (pageName.includes('end.html')) return 'Full_Experiment';
    return 'Page_View';
}

function startEvent(eventType, eventDetail) {
    const pId = sessionStorage.getItem('participantId');
    if (!pId) return;
    const activeTimers = JSON.parse(sessionStorage.getItem('activeTimers') || '{}');
    activeTimers[eventType] = { startTime: new Date().getTime(), detail: eventDetail };
    sessionStorage.setItem('activeTimers', JSON.stringify(activeTimers));
}

function endEvent(eventType) {
    const pId = sessionStorage.getItem('participantId');
    const sId = sessionStorage.getItem('sessionId');
    if (!pId || !sId) return;
    const activeTimers = JSON.parse(sessionStorage.getItem('activeTimers') || '{}');
    const eventToLog = activeTimers[eventType];
    if (eventToLog) {
        const endTime = new Date().getTime();
        const startTime = eventToLog.startTime;
        const duration = endTime - startTime;
        const formData = new FormData();
        formData.append(EVENT_LOG_ENTRIES.participantId, pId);
        formData.append(EVENT_LOG_ENTRIES.sessionId, sId);
        formData.append(EVENT_LOG_ENTRIES.eventType, eventType);
        formData.append(EVENT_LOG_ENTRIES.eventDetail, eventToLog.detail);
        formData.append(EVENT_LOG_ENTRIES.startTime, new Date(startTime).toISOString());
        formData.append(EVENT_LOG_ENTRIES.endTime, new Date(endTime).toISOString());
        formData.append(EVENT_LOG_ENTRIES.duration, duration);
        fetch(EVENT_LOG_FORM_URL, { method: 'POST', body: formData, mode: 'no-cors' }).catch(console.error);
        delete activeTimers[eventType];
        sessionStorage.setItem('activeTimers', JSON.stringify(activeTimers));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // --- Start Event Timing ---
    if (currentPage !== 'index.html' && currentPage !== '') {
        const eventType = getEventTypeForPage(currentPage);
        startEvent(eventType, currentPage);
    }
    
    // --- Welcome Page Login Logic ---
    if (currentPage === 'index.html' || currentPage === '') {
        const showLoginBtn = document.getElementById('show-login-btn');
        const loginArea = document.getElementById('login-area');
        const participantIdInput = document.getElementById('participant-id');
        const sessionIdInput = document.getElementById('session-id');
        const startButton = document.getElementById('next-btn');
        showLoginBtn.addEventListener('click', () => {
            showLoginBtn.style.display = 'none';
            loginArea.style.display = 'block';
        });
        function validateInputs() { startButton.disabled = !(participantIdInput.value.trim() && sessionIdInput.value.trim()); }
        participantIdInput.addEventListener('input', validateInputs);
        sessionIdInput.addEventListener('input', validateInputs);
    }
    
    // --- Standard Page Setup ---
    const themeTogglePlaceholder = document.getElementById('theme-toggle');
    if (themeTogglePlaceholder) themeTogglePlaceholder.innerHTML = themeToggleHTML;
    if (document.body.id === 'welcome-page') {
        const logosPlaceholder = document.getElementById('logos-placeholder');
        if (logosPlaceholder) logosPlaceholder.innerHTML = logosHTML;
    }
    const applyTheme = () => { const savedTheme = localStorage.getItem('theme') || 'light'; document.body.classList.toggle('dark-theme', savedTheme === 'dark'); };
    applyTheme();

    // --- Visual Progress Timer ---
    const participantId = sessionStorage.getItem('participantId');
    const countdownTime = pageTimers[currentPage];
    if (countdownTime && participantId) {
        const timerContainer = document.getElementById('timer');
        if (timerContainer) {
            const totalTime = parseInt(countdownTime, 10);
            let timeLeft = totalTime;
            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("class", "timer-svg");
            svg.setAttribute("viewBox", "0 0 100 100");
            const trackCircle = document.createElementNS(svgNS, "circle");
            trackCircle.setAttribute("class", "timer-track");
            trackCircle.setAttribute("cx", "50");
            trackCircle.setAttribute("cy", "50");
            trackCircle.setAttribute("r", "45");
            trackCircle.setAttribute("stroke-width", "8");
            const progressCircle = document.createElementNS(svgNS, "circle");
            progressCircle.setAttribute("class", "timer-progress");
            progressCircle.setAttribute("cx", "50");
            progressCircle.setAttribute("cy", "50");
            progressCircle.setAttribute("r", "45");
            progressCircle.setAttribute("stroke-width", "8");
            const radius = 45;
            const circumference = 2 * Math.PI * radius;
            progressCircle.style.strokeDasharray = circumference;
            const timerText = document.createElementNS(svgNS, "text");
            timerText.setAttribute("class", "timer-text");
            timerText.setAttribute("x", "50%");
            timerText.setAttribute("y", "50%");
            timerText.setAttribute("dy", ".3em");
            timerText.setAttribute("text-anchor", "middle");
            timerText.style.transform = "rotate(90deg)";
            timerText.style.transformOrigin = "center";
            svg.appendChild(trackCircle);
            svg.appendChild(progressCircle);
            svg.appendChild(timerText);
            timerContainer.appendChild(svg);
            const updateTimer = () => {
                if (timeLeft < 0) { clearInterval(timerInterval); return; }
                const minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                timerText.textContent = `${minutes}:${seconds}`;
                const progress = timeLeft / totalTime;
                progressCircle.style.strokeDashoffset = circumference * (1 - progress);
                timeLeft--;
            };
            updateTimer();
            const timerInterval = setInterval(updateTimer, 1000);
        }
    }

    // --- GLOBAL EVENT LISTENERS ---
    document.addEventListener('click', event => {
        if (event.target.closest('#theme-switch-btn')) {
            const isDark = document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
        if (event.target.matches('#next-btn')) {
            const nextPage = pageFlow[currentPage];
            if (currentPage === 'index.html' || currentPage === '') {
                const pIdInput = document.getElementById('participant-id').value.trim();
                const sIdInput = document.getElementById('session-id').value.trim();
                sessionStorage.setItem('participantId', pIdInput);
                sessionStorage.setItem('sessionId', sIdInput);
                startEvent('Full_Experiment', `Participant: ${pIdInput}`);
            } else {
                const eventType = getEventTypeForPage(currentPage);
                endEvent(eventType);
            }
            if (nextPage) { window.location.href = nextPage; }
        }
    });

    const surveyIframe = document.getElementById('survey-iframe');
    if (surveyIframe) {
        let isInitialLoad = true;
        surveyIframe.onload = () => {
            if (isInitialLoad) { isInitialLoad = false; return; }
            const eventType = getEventTypeForPage(currentPage);
            endEvent(eventType);
            const nextPage = pageFlow[currentPage];
            if (nextPage) { window.location.href = nextPage; }
        };
    }

    // --- N-BACK TASK LOGIC ---
    const nBackContainer = document.getElementById('n-back-container');
    if (nBackContainer) {
        const nBackData = { 1: { name: "1-Back", instruction: "Press 'TARGET' if the current letter is the same as the letter that appeared 1 step back. Otherwise, press 'NON-TARGET'.", trials: [{s:'F',c:'NON-TARGET'},{s:'H',c:'NON-TARGET'},{s:'H',c:'TARGET'},{s:'J',c:'NON-TARGET'},{s:'K',c:'NON-TARGET'},{s:'K',c:'TARGET'},{s:'L',c:'NON-TARGET'},{s:'P',c:'NON-TARGET'},{s:'P',c:'TARGET'},{s:'T',c:'NON-TARGET'},{s:'R',c:'NON-TARGET'},{s:'R',c:'TARGET'},{s:'S',c:'NON-TARGET'},{s:'V',c:'NON-TARGET'},{s:'V',c:'TARGET'},{s:'X',c:'NON-TARGET'},{s:'X',c:'TARGET'},{s:'M',c:'NON-TARGET'},{s:'J',c:'NON-TARGET'},{s:'J',c:'TARGET'},{s:'Q',c:'NON-TARGET'},{s:'W',c:'NON-TARGET'},{s:'W',c:'TARGET'},{s:'Z',c:'NON-TARGET'},{s:'Y',c:'NON-TARGET'},{s:'Y',c:'TARGET'},{s:'N',c:'NON-TARGET'},{s:'B',c:'NON-TARGET'},{s:'B',c:'TARGET'},{s:'G',c:'NON-TARGET'}] }, 2: { name: "2-Back", instruction: "Press 'TARGET' if the current letter is the same as the letter from 2 steps back.", trials: [{s:'L',c:'NON-TARGET'},{s:'C',c:'NON-TARGET'},{s:'L',c:'TARGET'},{s:'K',c:'NON-TARGET'},{s:'G',c:'NON-TARGET'},{s:'K',c:'TARGET'},{s:'H',c:'NON-TARGET'},{s:'G',c:'TARGET'},{s:'P',c:'NON-TARGET'},{s:'H',c:'TARGET'},{s:'B',c:'NON-TARGET'},{s:'P',c:'TARGET'},{s:'B',c:'TARGET'},{s:'T',c:'NON-TARGET'},{s:'M',c:'NON-TARGET'},{s:'T',c:'TARGET'},{s:'K',c:'NON-TARGET'},{s:'G',c:'NON-TARGET'},{s:'K',c:'TARGET'},{s:'P',c:'NON-TARGET'},{s:'K',c:'TARGET'},{s:'S',c:'NON-TARGET'},{s:'A',c:'NON-TARGET'},{s:'S',c:'TARGET'},{s:'D',c:'NON-TARGET'},{s:'F',c:'NON-TARGET'},{s:'D',c:'TARGET'},{s:'Z',c:'NON-TARGET'},{s:'X',c:'NON-TARGET'},{s:'C',c:'NON-TARGET'}] }, 3: { name: "3-Back", instruction: "Press 'TARGET' if the current letter is the same as the letter from 3 steps back.", trials: [{s:'R',c:'NON-TARGET'},{s:'T',c:'NON-TARGET'},{s:'S',c:'NON-TARGET'},{s:'R',c:'TARGET'},{s:'M',c:'NON-TARGET'},{s:'S',c:'TARGET'},{s:'P',c:'NON-TARGET'},{s:'M',c:'TARGET'},{s:'L',c:'NON-TARGET'},{s:'P',c:'TARGET'},{s:'M',c:'NON-TARGET'},{s:'L',c:'TARGET'},{s:'F',c:'NON-TARGET'},{s:'Q',c:'NON-TARGET'},{s:'F',c:'TARGET'},{s:'L',c:'NON-TARGET'},{s:'H',c:'NON-TARGET'},{s:'F',c:'TARGET'},{s:'H',c:'NON-TARGET'},{s:'H',c:'TARGET'},{s:'V',c:'NON-TARGET'},{s:'H',c:'TARGET'},{s:'C',c:'NON-TARGET'},{s:'V',c:'TARGET'},{s:'B',c:'NON-TARGET'},{s:'N',c:'NON-TARGET'},{s:'M',c:'NON-TARGET'},{s:'B',c:'TARGET'},{s:'Y',c:'NON-TARGET'},{s:'T',c:'NON-TARGET'}] }};
        let currentLevel = 1; let trials; let trialIndex = 0; let stimulusHistory = []; let canRespond = false; let stimulusStartTime = 0;
        const instructionsDiv = document.getElementById('n-back-instructions'); const taskAreaDiv = document.getElementById('n-back-task-area'); const completionDiv = document.getElementById('n-back-completion'); const stimulusDisplay = document.getElementById('stimulus-display'); const startBtn = document.getElementById('start-n-back-btn'); const titleEl = document.getElementById('n-back-title'); const instructionTextEl = document.getElementById('n-back-instruction-text');
        function setupNextLevel() {
            if (currentLevel > 3) { showFinalCompletion(); return; }
            startEvent(`NBack_Level_${currentLevel}_Instructions`, 'Instruction_View');
            const levelData = nBackData[currentLevel];
            titleEl.textContent = `Level ${currentLevel}: ${levelData.name} Challenge`;
            instructionTextEl.textContent = levelData.instruction;
            startBtn.textContent = `Start Level ${currentLevel}`;
            taskAreaDiv.style.display = 'none'; completionDiv.style.display = 'none'; instructionsDiv.style.display = 'block';
        }
        function startQuiz() {
            endEvent(`NBack_Level_${currentLevel}_Instructions`);
            startEvent(`NBack_Level_${currentLevel}_Quiz`, 'Trial_Sequence');
            instructionsDiv.style.display = 'none'; taskAreaDiv.style.display = 'block';
            trials = nBackData[currentLevel].trials; trialIndex = 0; stimulusHistory = [];
            showNextStimulus();
        }
        function showNextStimulus() {
            if (trialIndex >= trials.length) { endLevel(); return; }
            const currentStimulus = trials[trialIndex].s;
            stimulusDisplay.classList.remove('stimulus-animate'); void stimulusDisplay.offsetWidth;
            stimulusDisplay.textContent = currentStimulus;
            stimulusDisplay.classList.add('stimulus-animate');
            stimulusHistory.push(currentStimulus); canRespond = true; stimulusStartTime = performance.now();
        }
        function checkAnswer(userAnswer) {
            if (!canRespond) return; canRespond = false;
            const responseTime = Math.round(performance.now() - stimulusStartTime);
            const correctAnswer = trials[trialIndex].c;
            const isCorrect = userAnswer === correctAnswer;
            const trialData = { participantId: sessionStorage.getItem('participantId'), sessionId: sessionStorage.getItem('sessionId'), level: currentLevel, trial: trialIndex + 1, stimulus: trials[trialIndex].s, response: userAnswer, correct: isCorrect ? 1 : 0, responseTime: responseTime };
            submitNBackData(trialData);
            trialIndex++; setTimeout(showNextStimulus, 750);
        }
        function submitNBackData(data) {
            const formData = new FormData();
            formData.append(NBACK_FORM_ENTRIES.participantId, data.participantId); formData.append(NBACK_FORM_ENTRIES.sessionId, data.sessionId);
            formData.append(NBACK_FORM_ENTRIES.level, data.level); formData.append(NBACK_FORM_ENTRIES.trial, data.trial);
            formData.append(NBACK_FORM_ENTRIES.stimulus, data.stimulus); formData.append(NBACK_FORM_ENTRIES.response, data.response);
            formData.append(NBACK_FORM_ENTRIES.correct, data.correct); formData.append(NBACK_FORM_ENTRIES.responseTime, data.responseTime);
            fetch(NBACK_FORM_URL, { method: 'POST', body: formData, mode: 'no-cors' }).catch(console.error);
        }
        function endLevel() {
            endEvent(`NBack_Level_${currentLevel}_Quiz`);
            currentLevel++;
            setupNextLevel();
        }
        function showFinalCompletion() {
            endEvent('NBack_Task');
            instructionsDiv.style.display = 'none'; taskAreaDiv.style.display = 'none';
            completionDiv.style.display = 'block';
            completionDiv.innerHTML = `<h2>Task Complete</h2><p>Thank you. Please press continue.</p><button id="next-btn" data-next="${pageFlow[currentPage]}">Continue to Next Task</button>`;
        }
        startBtn.addEventListener('click', startQuiz);
        document.querySelectorAll('.response-btn').forEach(button => { button.addEventListener('click', () => { checkAnswer(button.dataset.answer); }); });
        setupNextLevel();
    }
    
    // --- STROOP TASK LOGIC ---
    const stroopContainer = document.getElementById('stroop-container');
    if (stroopContainer) {
        const colors = { 'Red': '#E74C3C', 'Green': '#2ECC71', 'Blue': '#3498DB', 'Yellow': '#F1C40F' };
        const wordLists = {
            Positive: ['HAPPY', 'FRIEND', 'SMILE', 'PEACE', 'SUNNY', 'DREAM', 'LAUGH', 'BRAVE', 'JOYFUL', 'SWEET'],
            Negative: ['ANGER', 'STORM', 'ALONE', 'PANIC', 'GRIEF', 'SADLY', 'FIGHT', 'HURTS', 'DEATH', 'FEARS'],
            Neutral:  ['PAPER', 'HOUSE', 'TABLE', 'CLOCK', 'WATER', 'CHAIR', 'FLOOR', 'STONE', 'TRUCK', 'GLASS']
        };
        const instructionsDiv = document.getElementById('stroop-instructions');
        const taskAreaDiv = document.getElementById('stroop-task-area');
        const completionDiv = document.getElementById('stroop-completion');
        const startBtn = document.getElementById('start-stroop-btn');
        const wordDisplay = document.getElementById('stroop-word-display');
        const responseButtons = document.querySelectorAll('.stroop-response-btn');
        let trials = []; let currentTrialIndex = 0; let stimulusStartTime = 0;
        const shuffle = (array) => array.sort(() => Math.random() - 0.5);

        function prepareExperiment() {
            let masterList = [];
            for (const type in wordLists) {
                wordLists[type].forEach(word => { masterList.push({ word: word, type: type }); });
            }
            trials = shuffle(masterList);
            trials.forEach(trial => {
                const randomColorName = shuffle(Object.keys(colors))[0];
                trial.colorName = randomColorName;
                trial.colorHex = colors[randomColorName];
            });
            startBtn.addEventListener('click', startQuiz);
            responseButtons.forEach(button => { button.addEventListener('click', handleButtonClick); });
        }
        function startQuiz() {
            instructionsDiv.style.display = 'none';
            taskAreaDiv.style.display = 'block';
            currentTrialIndex = 0;
            runNextTrial();
        }
        function runNextTrial() {
            if (currentTrialIndex >= trials.length) { showFinalCompletion(); return; }
            wordDisplay.innerHTML = '<div class="fixation-cross" style="font-size: 4rem; color: inherit;">+</div>';
            responseButtons.forEach(button => button.disabled = true);
            setTimeout(() => {
                const trial = trials[currentTrialIndex];
                wordDisplay.textContent = trial.word;
                wordDisplay.style.color = trial.colorHex;
                stimulusStartTime = performance.now();
                responseButtons.forEach(button => button.disabled = false);
            }, 500);
        }
        function handleButtonClick(event) {
            responseButtons.forEach(button => button.disabled = true);
            const reactionTime = Math.round(performance.now() - stimulusStartTime);
            const trial = trials[currentTrialIndex];
            const userResponseColor = event.target.dataset.color;
            const accuracy = (userResponseColor === trial.colorName) ? 1 : 0;
            const trialData = {
                participantId: sessionStorage.getItem('participantId'), sessionId: sessionStorage.getItem('sessionId'),
                blockType: trial.type, word: trial.word, inkColor: trial.colorName,
                userResponse: userResponseColor, accuracy: accuracy, reactionTime: reactionTime
            };
            submitStroopData(trialData);
            wordDisplay.innerHTML = '';
            setTimeout(() => { currentTrialIndex++; runNextTrial(); }, 1000);
        }
        function submitStroopData(data) {
            const formData = new FormData();
            formData.append(STROOP_FORM_ENTRIES.participantId, data.participantId);
            formData.append(STROOP_FORM_ENTRIES.sessionId, data.sessionId);
            formData.append(STROOP_FORM_ENTRIES.blockType, data.blockType);
            formData.append(STROOP_FORM_ENTRIES.word, data.word);
            formData.append(STROOP_FORM_ENTRIES.inkColor, data.inkColor);
            formData.append(STROOP_FORM_ENTRIES.userResponse, data.userResponse);
            formData.append(STROOP_FORM_ENTRIES.accuracy, data.accuracy);
            formData.append(STROOP_FORM_ENTRIES.reactionTime, data.reactionTime);
            fetch(STROOP_FORM_URL, { method: 'POST', body: formData, mode: 'no-cors' }).catch(console.error);
        }
        function showFinalCompletion() {
            const eventType = getEventTypeForPage(currentPage);
            endEvent(eventType);
            taskAreaDiv.style.display = 'none';
            completionDiv.style.display = 'block';
        }
        prepareExperiment();
    }

    // --- NEW: IMAGE COUNTING TASK LOGIC ---
    const imageTaskContainer = document.getElementById('image-task-container');
    if (imageTaskContainer) {
        const imageTaskData = [
            { image: './visuals/task/numberOf/image1.png', question: 'Count the number of bicycles in the trees.', answer: 10 },
            { image: './visuals/task/numberOf/image2.png', question: 'Count the number of bicycles in the image.', answer: 10 },
            { image: './visuals/task/numberOf/image3.png', question: 'Count the number of books in the house structure.', answer: 10 },
            { image: './visuals/task/numberOf/image4.png', question: 'Count the number of cubes.', answer: 10 },
            { image: './visuals/task/numberOf/image5.png', question: 'Count the number of gate structures.', answer: 10 },
            { image: './visuals/task/numberOf/image6.png', question: 'Count the number of pencils.', answer: 10 },
            { image: './visuals/task/numberOf/image7.png', question: 'Count the number of rectangles.', answer: 10 },
            { image: './visuals/task/numberOf/image8.png', question: 'Count the number of squares.', answer: 10 },
            { image: './visuals/task/numberOf/image9.png', question: 'Count the number of triangles.', answer: 10 },
            { image: './visuals/task/numberOf/image10.png', question: 'Count the number of triangles.', answer: 10 }
        ];

        const instructionsDiv = document.getElementById('image-task-instructions');
        const taskAreaDiv = document.getElementById('image-task-area');
        const completionDiv = document.getElementById('image-task-completion');
        const startBtn = document.getElementById('start-image-task-btn');
        const taskImage = document.getElementById('task-image');
        const taskQuestion = document.getElementById('task-question');
        const answerInput = document.getElementById('task-answer-input');
        const submitBtn = document.getElementById('submit-answer-btn');

        let currentImageIndex = 0;
        let trialStartTime = 0;

        function startImageTask() {
            instructionsDiv.style.display = 'none';
            taskAreaDiv.style.display = 'flex';
            currentImageIndex = 0;
            showNextImage();
        }

        function showNextImage() {
            if (currentImageIndex >= imageTaskData.length) {
                showFinalCompletion();
                return;
            }
            const trial = imageTaskData[currentImageIndex];
            taskImage.src = trial.image;
            taskQuestion.textContent = trial.question;
            answerInput.value = '';
            answerInput.focus();
            submitBtn.disabled = false;
            trialStartTime = performance.now();
        }

        function handleSubmitAnswer() {
            submitBtn.disabled = true;
            const reactionTime = Math.round(performance.now() - trialStartTime);
            const trial = imageTaskData[currentImageIndex];
            const userResponse = parseInt(answerInput.value, 10);
            const isCorrect = (userResponse === trial.answer) ? 1 : 0;

            const trialData = {
                participantId: sessionStorage.getItem('participantId'),
                sessionId: sessionStorage.getItem('sessionId'),
                imageName: trial.image.split('/').pop(),
                question: trial.question,
                userResponse: isNaN(userResponse) ? 'NA' : userResponse,
                correctAnswer: trial.answer,
                isCorrect: isCorrect,
                responseTime: reactionTime
            };
            submitImageData(trialData);
            
            currentImageIndex++;
            // A brief pause before showing the next image
            setTimeout(showNextImage, 500);
        }

        function submitImageData(data) {
            const formData = new FormData();
            formData.append(IMAGE_TASK_FORM_ENTRIES.participantId, data.participantId);
            formData.append(IMAGE_TASK_FORM_ENTRIES.sessionId, data.sessionId);
            formData.append(IMAGE_TASK_FORM_ENTRIES.imageName, data.imageName);
            formData.append(IMAGE_TASK_FORM_ENTRIES.question, data.question);
            formData.append(IMAGE_TASK_FORM_ENTRIES.userResponse, data.userResponse);
            formData.append(IMAGE_TASK_FORM_ENTRIES.correctAnswer, data.correctAnswer);
            formData.append(IMAGE_TASK_FORM_ENTRIES.isCorrect, data.isCorrect);
            formData.append(IMAGE_TASK_FORM_ENTRIES.responseTime, data.responseTime);
            
            fetch(IMAGE_TASK_FORM_URL, { method: 'POST', body: formData, mode: 'no-cors' }).catch(console.error);
        }

        function showFinalCompletion() {
            const eventType = getEventTypeForPage(currentPage);
            endEvent(eventType);
            taskAreaDiv.style.display = 'none';
            completionDiv.style.display = 'block';
        }

        startBtn.addEventListener('click', startImageTask);
        submitBtn.addEventListener('click', handleSubmitAnswer);
        answerInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if wrapped in a form
                handleSubmitAnswer();
            }
        });
    }
});