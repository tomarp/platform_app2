document.addEventListener('DOMContentLoaded', () => {
    const imageTaskContainer = document.getElementById('image-task-container');
    if (!imageTaskContainer) return;

    // --- DATA & CONFIGURATION ---
    const countingTaskData = [
        { image: './media/visual_processing/count/image1.png', question: 'Count the number of bicycles in the trees.', answer: 10 },
        { image: './media/visual_processing/count/image2.png', question: 'Count the number of bicycles in the image.', answer: 10 },
    ];
    
    const shapeTaskData = [
        { image: 'media/visual_processing/shape/DIFF_image1.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'DIFFERENT' },
        { image: 'media/visual_processing/shape/DIFF_image2.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'DIFFERENT' },
    ];

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    // --- DOM ELEMENTS ---
    const instructionsDiv = document.getElementById('image-task-instructions');
    const taskAreaDiv = document.getElementById('image-task-area');
    const completionDiv = document.getElementById('image-task-completion');
    const startBtn = document.getElementById('start-image-task-btn');
    const taskImage = document.getElementById('task-image');
    const taskQuestion = document.getElementById('task-question');
    const answerInput = document.getElementById('task-answer-input');
    const submitBtn = document.getElementById('submit-answer-btn');
    const responseButtons = taskAreaDiv.querySelectorAll('.response-btn');

    // --- STATE MANAGEMENT ---
    let trials = [];
    let currentTrialIndex = 0;
    let trialStartTime = 0;
    let isShapeTask = false;

    // --- CORE LOGIC ---
    function initializeTask() {
        const path = window.location.pathname;
        if (path.includes('visualShape.html')) {
            isShapeTask = true;
            trials = shuffle(shapeTaskData);
        } else {
            isShapeTask = false;
            trials = shuffle(countingTaskData);
        }
        startBtn.addEventListener('click', startTask);
        if (isShapeTask) {
            responseButtons.forEach(btn => btn.addEventListener('click', handleShapeResponse));
        } else {
            submitBtn.addEventListener('click', handleCountResponse);
            answerInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    handleCountResponse();
                }
            });
        }
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
        const trial = trials[currentTrialIndex];
        taskImage.src = trial.image;
        if (isShapeTask) {
            responseButtons.forEach(btn => btn.disabled = false);
        } else {
            taskQuestion.textContent = trial.question;
            answerInput.value = '';
            answerInput.focus();
            submitBtn.disabled = false;
        }
        trialStartTime = performance.now();
    }
    
    function handleCountResponse() {
        if (answerInput.value.trim() === '') {
            alert("Please enter a count before submitting.");
            return;
        }
        submitBtn.disabled = true;
        const userResponse = parseInt(answerInput.value, 10);
        processResponse(isNaN(userResponse) ? 'NA' : userResponse);
    }

    function handleShapeResponse(event) {
        responseButtons.forEach(btn => btn.disabled = true);
        const userResponse = event.target.dataset.answer;
        processResponse(userResponse);
    }

    function processResponse(userResponse) {
        const reactionTime = Math.round(performance.now() - trialStartTime);
        const trial = trials[currentTrialIndex];
        const isCorrect = (userResponse == trial.answer) ? 1 : 0;

        const trialData = {
            participantId: sessionStorage.getItem('participantId'),
            sessionId: sessionStorage.getItem('sessionId'),
            imageName: trial.image.split('/').pop(),
            question: trial.question,
            userResponse: userResponse,
            isCorrect: isCorrect,
            responseTime: reactionTime
        };
        submitImageData(trialData);
        
        currentTrialIndex++;
        setTimeout(runNextTrial, 500);
    }

    // FIXED: Updated the data submission to use the reliable Google Apps Script method
    function submitImageData(data) {
        data.taskType = isShapeTask ? 'Visual-Shape' : 'Visual-Count'; // Add taskType for Apps Script routing

        fetch(WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            if (data.result !== 'success') {
                console.error('Error writing Visual data to spreadsheet:', data.error);
            }
        })
        .catch(error => {
            console.error('Error submitting Visual data:', error);
        });
    }

    function showFinalCompletion() {
        taskAreaDiv.style.display = 'none';
        completionDiv.style.display = 'block';
    }

    // --- INITIALIZATION ---
    initializeTask();
});