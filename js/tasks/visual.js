document.addEventListener('DOMContentLoaded', () => {
    const imageTaskContainer = document.getElementById('image-task-container');
    if (!imageTaskContainer) return;

    // --- DATA & CONFIGURATION ---
    const countingTaskData = [
        { image: './media/visual_processing/count/bicycles_29.png', question: 'Count the number of bicycles in the trees.', answer: 29 },
        { image: './media/visual_processing/count/cubes_5.png', question: 'Count the number of cubes in the image.', answer: 5 },
        { image: './media/visual_processing/count/bicycles_22.png', question: 'Count the number of bicycles in the image.', answer: 22 },
        { image: './media/visual_processing/count/books_22.png', question: 'Count the number of books in the image.', answer: 22 },
        { image: './media/visual_processing/count/gates_20.png', question: 'Count the number of gates in the structure.', answer: 20 },
        { image: './media/visual_processing/count/pencils_15.png', question: 'Count the number of pencils in the image.', answer: 15 },
        { image: './media/visual_processing/count/rectangles_14.png', question: 'Count the number of rectangles in the structure.', answer: 14 },
        { image: './media/visual_processing/count/squares_15.png', question: 'Count the number of squares in the image.', answer: 15 },
        { image: './media/visual_processing/count/stairs_36.png', question: 'Count the number of stairs in the building.', answer: 36 },
        { image: './media/visual_processing/count/stairs_65.png', question: 'Count the number of stairs in the image.', answer: 65 },
        { image: './media/visual_processing/count/triangles_30.png', question: 'Count the number of triangles in the image.', answer: 30 },
        { image: './media/visual_processing/count/stairs_90.png', question: 'Count the number of stairs in the image.', answer: 90 },
        { image: './media/visual_processing/count/triangles_10.png', question: 'Count the number of triangles in the image.', answer: 10 },
    ];
    
    const shapeTaskData = [
        { image: 'media/visual_processing/shape/image1_dif.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'DIFFERENT' },
        { image: 'media/visual_processing/shape/image2_dif.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'DIFFERENT' },
        { image: 'media/visual_processing/shape/image3_same.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'SAME' },
        { image: 'media/visual_processing/shape/image4_same.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'SAME' },
        { image: 'media/visual_processing/shape/image5_same.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'SAME' },
        { image: 'media/visual_processing/shape/image6_same.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'SAME' },
        { image: 'media/visual_processing/shape/image7_dif.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'DIFFERENT' },
        { image: 'media/visual_processing/shape/image8_dif.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'DIFFERENT' },
        { image: 'media/visual_processing/shape/image9_dif.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'DIFFERENT' },
        { image: 'media/visual_processing/shape/image10_same.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'SAME' },
        { image: 'media/visual_processing/shape/image11_same.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'SAME' },
        { image: 'media/visual_processing/shape/image12_dif.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'DIFFERENT' },
        { image: 'media/visual_processing/shape/image13_same.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'SAME' },
        { image: 'media/visual_processing/shape/image14_dif.jpeg', question: 'Are the two shapes the SAME or DIFFERENT?', answer: 'DIFFERENT' },
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
            if(submitBtn) {
                submitBtn.addEventListener('click', handleCountResponse);
            }
            if(answerInput) {
                answerInput.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        handleCountResponse();
                    }
                });
            }
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

    // REVERTED: This function now submits data directly to the Visual Task Google Form.
    function submitImageData(data) {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            const entryId = IMAGE_TASK_FORM_ENTRIES[key];
            if (entryId) {
                formData.append(entryId, data[key]);
            }
        });

        fetch(IMAGE_TASK_FORM_URL, {
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