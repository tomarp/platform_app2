// ===================================================================================
//  CORE SCRIPT LOGIC
// ===================================================================================

function getEventTypeForPage(pageName) {
    if (pageName.includes('survey_t')) return pageName.replace('.html', '');
    if (pageName.includes('baseline_signals')) return 'Baseline_Signal';
    if (pageName.includes('n-back_letter')) return 'NBack_Letter_Task';
    if (pageName.includes('n-back_digit')) return 'NBack_Digit_Task';
    if (pageName.includes('stroop_word')) return 'Stroop_Word_Task';
    if (pageName.includes('stroop_word-image')) return 'Stroop_Word_Image_Task';
    if (pageName.includes('visual_count')) return 'Visual_Count_Task';
    if (pageName.includes('visual_shape')) return 'Visual_Shape_Task';
    if (pageName.includes('flanker_arrow')) return 'Flanker_Arrow_Task';
    if (pageName.includes('flanker_digit')) return 'Flanker_Digit_Task';
    if (pageName.includes('end.html')) return 'Experiment_End_Page';
    if (pageName.includes('index.html')) return 'Welcome_Page';
    return 'Page_View';
}

function startEvent(eventType, eventDetail) {
    if (typeof EVENT_LOG_ENTRIES === 'undefined') return;
    const pId = sessionStorage.getItem('participantId');
    if (!pId && eventType !== 'Full_Experiment') return;
    const activeTimers = JSON.parse(sessionStorage.getItem('activeTimers') || '{}');
    activeTimers[eventType] = { startTime: new Date().getTime(), detail: eventDetail };
    sessionStorage.setItem('activeTimers', JSON.stringify(activeTimers));
}

function endEvent(eventType) {
    if (typeof EVENT_LOG_ENTRIES === 'undefined' || typeof EVENT_LOG_FORM_URL === 'undefined') return;
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
    // This safety check ensures that no code runs if the config file has an error.
    if (typeof pageFlow === 'undefined' || typeof pageTimers === 'undefined') {
        console.error("CRITICAL ERROR: config.js failed to load or has a syntax error. Application halted.");
        document.body.innerHTML = '<div style="padding: 2em; text-align: center; font-family: sans-serif;"><h1>Configuration Error</h1><p>The application could not start. Please contact the administrator.</p></div>';
        return; 
    }

    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    const eventType = getEventTypeForPage(currentPage);
    startEvent(eventType, currentPage);

    if (currentPage === 'index.html' || currentPage === '') {
        const showLoginBtn = document.getElementById('show-login-btn');
        const loginArea = document.getElementById('login-area');
        const startArea = document.getElementById('start-area');
        const initialView = document.getElementById('initial-view');
        const participantIdInput = document.getElementById('participant-id');
        const sessionIdInput = document.getElementById('session-id');
        const submitLoginBtn = document.getElementById('submit-login-btn');

        if(showLoginBtn) {
            showLoginBtn.addEventListener('click', () => {
                initialView.style.display = 'none';
                loginArea.style.display = 'block';
            });
        }

        if(participantIdInput && sessionIdInput && submitLoginBtn) {
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
    }

    const themeTogglePlaceholder = document.getElementById('theme-toggle');
    if (themeTogglePlaceholder) themeTogglePlaceholder.innerHTML = themeToggleHTML;
    
    const logosPlaceholder = document.getElementById('logos-placeholder');
    if (logosPlaceholder && document.body.id === 'welcome-page') {
         logosPlaceholder.innerHTML = logosHTML;
    }

    const applyTheme = () => { const savedTheme = localStorage.getItem('theme') || 'light'; document.body.classList.toggle('dark-theme', savedTheme === 'dark'); };
    applyTheme();

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

            const timerInterval = setInterval(() => {
                if (timeLeft < 0) {
                    clearInterval(timerInterval);
                    const nextBtnContainer = document.getElementById('timer-next-btn-container');
                    if (nextBtnContainer) {
                        const nextButton = document.createElement('button');
                        nextButton.id = 'next-btn';
                        nextButton.textContent = 'Continue';
                        nextButton.className = 'nav-button';
                        nextBtnContainer.appendChild(nextButton);
                    }
                    if (timerContainer) timerContainer.style.display = 'none';
                    return;
                }
                const minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                timerText.textContent = `${minutes}:${seconds}`;
                progressCircle.style.strokeDashoffset = circumference * (1 - (timeLeft / totalTime));
                timeLeft--;
            }, 1000);
        }
    }

    document.addEventListener('click', event => {
        if (event.target.closest('#theme-switch-btn')) {
            const isDark = document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
        if (event.target.matches('#next-btn')) {
            const currentEventType = getEventTypeForPage(currentPage);
            endEvent(currentEventType);
            
            const nextPage = pageFlow[currentPage];
            if (nextPage) {
                window.location.href = nextPage;
            } else if (currentPage === 'end.html') {
                endEvent('Full_Experiment');
            }
        }
    });

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