// ===================================================================================
//  MASTER CONFIGURATION
// ===================================================================================

const TIMER_VISIBLE = true;

// --- GOOGLE FORM URLS AND ENTRY IDs ---

// 1. CONFIGURATION FOR THE "EVENT LOG" FORM
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
    responseTime:  'entry.514183285',
    taskType:      'entry.1011139459' // IMPORTANT: Add a 'taskType' question to your form and put its entry ID here.
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

// 4. CONFIGURATION FOR THE "IMAGE VISUAL PROCESSING TASK DATA" FORM
const IMAGE_TASK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdhfpYSoDfp1p3DbMBzGtqX7KhFmAn7dT4qRYXBwvZ1Td6_JA/formResponse';
const IMAGE_TASK_FORM_ENTRIES = {
    participantId: 'entry.736385545',
    sessionId:     'entry.1326819775',
    taskType:      'entry.YOUR_NEW_ENTRY_ID', // IMPORTANT: Add a 'taskType' question to your form and put its entry ID here.
    imageName:     'entry.711691944',
    question:      'entry.1479384826',
    userResponse:  'entry.2047010352',
    isCorrect:     'entry.1499410862',
    responseTime:  'entry.1692700124'
};

// 5. FLANKER TASK DATA FORM
const FLANKER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdXwOldLsHXu0YD_FyaN-KZ3MA3AW_WEQ3Qpj1vRJj6-nxxRw/formResponse';
const FLANKER_FORM_ENTRIES = {
    participantId: 'entry.155710015',
    sessionId:     'entry.1713671006',
    taskType:      'entry.1607571633',
    condition:     'entry.1890185660',
    stimulus:      'entry.155329877',
    target:        'entry.1333268899',
    userResponse:  'entry.1103664613',
    accuracy:      'entry.1369169089',
    reactionTime:  'entry.1534775185'
};

// 6. PAGE-SPECIFIC TIMER CONFIGURATION (in seconds)
const pageTimers = {
    'surveyT0.html'         :   5*60, 
    'baseline.html'         :   5*60, 
    'surveyT1.html'         :   5*60,
    'nBackLetter.html'      :   5*60, 
    'stroopWord.html'       :   5*60, 
    'visualCount.html'      :   5*60, 
    'flankerArrow.html'     :   5*60,
    'surveyT2.html'         :   5*60, 
    'nBackDigit.html'       :   5*60, 
    'stroopWordImage.html'  :   5*60,
    'visualShape.html'      :   5*60, 
    'flankerDigit.html'     :   5*60, 
    'surveyT3.html'         :   5*60
};

// 7. PAGE NAVIGATION MAP
const pageFlow = {
    'index.html': 'surveyT0.html', 'surveyT0.html': 'baseline.html',
    'baseline.html': 'surveyT1.html', 'surveyT1.html': 'nBackLetter.html',
    'nBackLetter.html': 'stroopWord.html', 'stroopWord.html': 'visualCount.html',
    'visualCount.html': 'flankerArrow.html', 'flankerArrow.html': 'surveyT2.html',
    'surveyT2.html': 'nBackDigit.html', 'nBackDigit.html': 'stroopWordImage.html',
    'stroopWordImage.html': 'visualShape.html', 'visualShape.html': 'flankerDigit.html',
    'flankerDigit.html': 'surveyT3.html', 'surveyT3.html': 'end.html'
};

// HTML SNIPPETS FOR INJECTION
const themeToggleHTML = `<button id="theme-switch-btn" title="Toggle theme"><svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.894 17.894a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM5.106 17.894a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM6.106 5.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 111.06-1.06l-1.59-1.59a.75.75 0 010-1.06z" /></svg><svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.472-.948.75.75 0 01.82.162l.142.242a.75.75 0 01-.162.819A10.5 10.5 0 119.528 1.718z" clip-rule="evenodd" /></svg></button>`;
const logosHTML = `<div id="logo-bottom-left1" class="logo-fixed"><img src="media/logo/unipg.png" alt="Logo 2"></div>
                    <div id="logo-bottom-left2" class="logo-fixed"><img src="media/logo/DTU.png" alt="Logo 3"></div>
                    <div id="logo-bottom-right1" class="logo-fixed"><img src="media/logo/music_2.png" alt="Logo 1"></div>
                    <div id="logo-bottom-right2" class="logo-fixed"><img src="media/logo/EU_funded_4.png" alt="Logo 4"></div>`;
