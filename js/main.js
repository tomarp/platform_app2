// ===================================================================================
//  CORE SCRIPT LOGIC
// ===================================================================================

/**
 * Creates a unique event type key based on the page filename.
 * @param {string} pageName - The filename of the current page.
 * @returns {string} The specific event type string for logging.
 */
// FIXED: Function now uses the correct filenames from config.js
function getEventTypeForPage(pageName) {
    if (pageName.includes('surveyT')) return pageName.replace('.html', '');
    if (pageName.includes('baseline')) return 'Baseline_Signal';
    if (pageName.includes('nBackLetter')) return 'NBack_Letter_Task';
    if (pageName.includes('nBackDigit')) return 'NBack_Digit_Task';
    if (pageName.includes('stroopWord')) return 'Stroop_Word_Task';
    if (pageName.includes('stroopWordImage')) return 'Stroop_Word_Image_Task';
    if (pageName.includes('visualCount')) return 'Visual_Count_Task';
    if (pageName.includes('visualShape')) return 'Visual_Shape_Task';
    if (pageName.includes('flankerArrow')) return 'Flanker_Arrow_Task';
    if (pageName.includes('flankerDigit')) return 'Flanker_Digit_Task';
    if (pageName.includes('end.html')) return 'Experiment_End_Page';
    if (pageName.includes('index.html')) return 'Welcome_Page';
    return 'Page_View';
}


/**
 * Starts a timer for a specific event.
 * @param {string} eventType - The type of event to start.
 * @param {string} eventDetail - Details about the event.
 */
function startEvent(eventType, eventDetail) {
    const pId = sessionStorage.getItem('participantId');
    if (!pId && eventType !== 'Full_Experiment') return;
    const activeTimers = JSON.parse(sessionStorage.getItem('activeTimers') || '{}');
    activeTimers[eventType] = { startTime: new Date().getTime(), detail: eventDetail };
    sessionStorage.setItem('activeTimers', JSON.stringify(activeTimers));
}

/**
 * Ends a timer for a specific event and submits the log.
 * @param {string} eventType - The type of event to end.
 */
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

        const eventData = {
            participantId: pId,
            sessionId: sId,
            eventType: eventType,
            eventDetail: eventToLog.detail,
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
            duration: duration
        };

        fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            if (data.result !== 'success') {
                console.error('Error writing event log to spreadsheet:', data.error);
            }
        })
        .catch(error => {
            console.error('Error submitting event log:', error);
        });

        delete activeTimers[eventType];
        sessionStorage.setItem('activeTimers', JSON.stringify(activeTimers));
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // --- Page Load Actions ---
    if (currentPage === 'end.html') {
        endEvent('Full_Experiment');
    }
    const eventType = getEventTypeForPage(currentPage);
    startEvent(eventType, currentPage);

    // --- Welcome Page Login Logic ---
    if (currentPage === 'index.html' || currentPage === '') {
        const showLoginBtn = document.getElementById('show-login-btn');
        const loginArea = document.getElementById('login-area');
        const startArea = document.getElementById('start-area');
        const initialView = document.getElementById('initial-view');
        const participantIdInput = document.getElementById('participant-id');
        const sessionIdInput = document.getElementById('session-id');
        const submitLoginBtn = document.getElementById('submit-login-btn');

        showLoginBtn.addEventListener('click', () => {
            initialView.style.display = 'none';
            loginArea.style.display = 'block';
        });

        function validateInputs() {
            submitLoginBtn.disabled = !(participantIdInput.value.trim() && sessionIdInput.value.trim());
        }
        participantIdInput.addEventListener('input', validateInputs);
        sessionIdInput.addEventListener('input', validateInputs);

        submitLoginBtn.addEventListener('click', () => {
            const pIdInput = participantIdInput.value.trim();
            const sIdInput = sessionIdInput.value.trim();
            sessionStorage.setItem('participantId', pIdInput);
            sessionStorage.setItem('sessionId', sIdInput);
            startEvent('Full_Experiment', `Participant: ${pIdInput}`);
            loginArea.style.display = 'none';
            startArea.style.display = 'block';
        });
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
    const countdownTime = pageTimers[currentPage];
    if (countdownTime) {
        const timerContainer = document.getElementById('timer');
        if (timerContainer) {
            const totalTime = parseInt(countdownTime, 10);
            let timeLeft = totalTime;
            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("viewBox", "0 0 100 100");
            svg.classList.add("timer-svg");
            const trackCircle = document.createElementNS(svgNS, "circle");
            trackCircle.setAttribute("class", "timer-track");
            trackCircle.setAttribute("cx", "50");
            trackCircle.setAttribute("cy", "50");
            trackCircle.setAttribute("r", "45");
            const progressCircle = document.createElementNS(svgNS, "circle");
            progressCircle.setAttribute("class", "timer-progress");
            progressCircle.setAttribute("cx", "50");
            progressCircle.setAttribute("cy", "50");
            progressCircle.setAttribute("r", "45");
            const circumference = 2 * Math.PI * 45;
            progressCircle.style.strokeDasharray = circumference;
            const timerText = document.createElementNS(svgNS, "text");
            timerText.setAttribute("class", "timer-text");
            timerText.setAttribute("x", "50%");
            timerText.setAttribute("y", "50%");
            timerText.setAttribute("dy", ".3em");
            timerText.setAttribute("text-anchor", "middle");
            svg.appendChild(trackCircle);
            svg.appendChild(progressCircle);
            svg.appendChild(timerText);

            if (TIMER_VISIBLE) {
                timerContainer.appendChild(svg);
            }

            const updateTimer = () => {
                if (timeLeft < 0) {
                    clearInterval(timerInterval);
                    const nextBtnContainer = document.getElementById('timer-next-btn-container');
                    if (nextBtnContainer) {
                        const nextButton = document.createElement('button');
                        nextButton.id = 'next-btn';
                        nextButton.textContent = 'Continue';
                        // FIXED: Added class for styling the timer's next button
                        nextButton.className = 'nav-button';
                        nextBtnContainer.appendChild(nextButton);
                    }
                    timerContainer.style.display = 'none';
                    return;
                }
                const minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                timerText.textContent = `${minutes}:${seconds}`;
                progressCircle.style.strokeDashoffset = circumference * (1 - (timeLeft / totalTime));
                timeLeft--;
            };
            updateTimer();
            const timerInterval = setInterval(updateTimer, 1000);
        }
    }

    // --- GLOBAL EVENT LISTENERS ---
    document.addEventListener('click', event => {
        // Theme toggle
        if (event.target.closest('#theme-switch-btn')) {
            const isDark = document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
        // Generic 'Next' button for page flow
        if (event.target.matches('#next-btn')) {
            const nextPage = pageFlow[currentPage];
            const currentEventType = getEventTypeForPage(currentPage);
            endEvent(currentEventType); // End event for the current page
            if (nextPage) {
                window.location.href = nextPage;
            }
        }
    });

    // --- Survey Iframe Logic ---
    const surveyIframe = document.getElementById('survey-iframe');
    if (surveyIframe) {
        let isInitialLoad = true;
        surveyIframe.onload = () => {
            if (isInitialLoad) {
                isInitialLoad = false;
                return;
            }
            const surveyEventType = getEventTypeForPage(currentPage);
            endEvent(surveyEventType);
            const nextPage = pageFlow[currentPage];
            if (nextPage) {
                window.location.href = nextPage;
            }
        };
    }
});