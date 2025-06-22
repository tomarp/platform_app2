// ===================================================================================
//  MASTER CONFIGURATION
// ===================================================================================

const TIMER_VISIBLE = true;

// Single endpoint for all data submission
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyK1fTAJbt6Ee1srIS_IBvZfAXdsLxuNryg06F2luLWiiijCasMuEFd71lb61ETHB4TfQ/exec';

// Centralized styling for task elements
const TASK_STYLING = {
    stroopImageHeight: '300px',
    stroopWordFontSize: '10rem'
};

// PAGE-SPECIFIC TIMER CONFIGURATION (in seconds)
const pageTimers = {
    'surveyT0.html': 5,
    'baseline.html': 5,
    'surveyT1.html': 5,
    'nBackLetter.html': 5,
    'stroopWord.html': 5,
    'visualCount.html': 5,
    'flankerArrow.html': 5,
    'surveyT2.html': 5,
    'nBackDigit.html': 5,
    'stroopWordImage.html': 5,
    'visualShape.html': 5,
    'flankerDigit.html': 5,
    'surveyT3.html': 5
};

// PAGE NAVIGATION MAP
const pageFlow = {
    'index.html': 'surveyT0.html',
    'surveyT0.html': 'baseline.html',
    'baseline.html': 'surveyT1.html',
    'surveyT1.html': 'nBackLetter.html',
    'nBackLetter.html': 'stroopWord.html',
    'stroopWord.html': 'visualCount.html',
    'visualCount.html': 'flankerArrow.html',
    'flankerArrow.html': 'surveyT2.html',
    'surveyT2.html': 'nBackDigit.html',
    'nBackDigit.html': 'stroopWordImage.html',
    'stroopWordImage.html': 'visualShape.html',
    'visualShape.html': 'flankerDigit.html',
    'flankerDigit.html': 'surveyT3.html',
    'surveyT3.html': 'end.html'
};

// HTML SNIPPETS FOR INJECTION
const themeToggleHTML = `<button id="theme-switch-btn" title="Toggle theme"><svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.894 17.894a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM5.106 17.894a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM6.106 5.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 111.06-1.06l-1.59-1.59a.75.75 0 010-1.06z" /></svg><svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.472-.948.75.75 0 01.82.162l.142.242a.75.75 0 01-.162.819A10.5 10.5 0 119.528 1.718z" clip-rule="evenodd" /></svg></button>`;
const logosHTML = `<div id="logo-top-center" class="logo-fixed"><img src="images/logo1.png" alt="Logo 1"></div><div id="logo-bottom-left" class="logo-fixed"><img src="images/logo2.png" alt="Logo 2"></div><div id="logo-bottom-center" class="logo-fixed"><img src="images/logo3.png" alt="Logo 3"></div><div id="logo-bottom-right" class="logo-fixed"><img src="images/logo4.png" alt="Logo 4"></div>`;