// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyBGPNJZOpeZZi0pNg41It6iKT4oKhuMQmI",
  authDomain: "english-test-66404.firebaseapp.com",
  databaseURL: "https://english-test-66404-default-rtdb.firebaseio.com",
  projectId: "english-test-66404",
  storageBucket: "english-test-66404.firebasestorage.app",
  messagingSenderId: "32600643426",
  appId: "1:32600643426:web:ee37767b1abc9456e77e3b",
  measurementId: "G-B5BBVTHZ0F"
};

// Firebase 변수 (초기화 후 설정)
let database;

// 전역 변수
let currentScreen = 'main-screen';
let words = [];
let testRecords = []; // 시험 기록을 메모리에 저장
let currentSortMode = 'date'; // 'date' 또는 'accuracy'
let currentTest = {
    questions: [],
    currentIndex: 0,
    answers: []
};

// 기본 단어 데이터
const defaultWords = [
    // 기본 명사
    { english: 'apple', korean: '사과' },
    { english: 'book', korean: '책' },
    { english: 'computer', korean: '컴퓨터' },
    { english: 'house', korean: '집' },
    { english: 'water', korean: '물' },
    { english: 'school', korean: '학교' },
    { english: 'friend', korean: '친구' },
    { english: 'family', korean: '가족' },
    { english: 'music', korean: '음악' },
    { english: 'movie', korean: '영화' },
    { english: 'car', korean: '자동차' },
    { english: 'dog', korean: '개' },
    { english: 'cat', korean: '고양이' },
    { english: 'bird', korean: '새' },
    { english: 'tree', korean: '나무' },
    { english: 'flower', korean: '꽃' },
    { english: 'sun', korean: '태양' },
    { english: 'moon', korean: '달' },
    { english: 'star', korean: '별' },
    { english: 'cloud', korean: '구름' },
    
    // 음식 관련
    { english: 'food', korean: '음식' },
    { english: 'rice', korean: '쌀, 밥' },
    { english: 'bread', korean: '빵' },
    { english: 'milk', korean: '우유' },
    { english: 'coffee', korean: '커피' },
    { english: 'tea', korean: '차' },
    { english: 'chicken', korean: '닭고기' },
    { english: 'fish', korean: '생선' },
    { english: 'vegetable', korean: '채소' },
    { english: 'fruit', korean: '과일' },
    { english: 'banana', korean: '바나나' },
    { english: 'orange', korean: '오렌지' },
    { english: 'cake', korean: '케이크' },
    { english: 'pizza', korean: '피자' },
    { english: 'sandwich', korean: '샌드위치' },
    
    // 일상 생활
    { english: 'time', korean: '시간' },
    { english: 'day', korean: '하루, 날' },
    { english: 'night', korean: '밤' },
    { english: 'morning', korean: '아침' },
    { english: 'afternoon', korean: '오후' },
    { english: 'evening', korean: '저녁' },
    { english: 'week', korean: '주' },
    { english: 'month', korean: '달' },
    { english: 'year', korean: '년' },
    { english: 'today', korean: '오늘' },
    { english: 'tomorrow', korean: '내일' },
    { english: 'yesterday', korean: '어제' },
    { english: 'money', korean: '돈' },
    { english: 'job', korean: '직업' },
    { english: 'work', korean: '일' },
    
    // 형용사
    { english: 'happy', korean: '행복한' },
    { english: 'sad', korean: '슬픈' },
    { english: 'angry', korean: '화난' },
    { english: 'beautiful', korean: '아름다운' },
    { english: 'ugly', korean: '못생긴' },
    { english: 'good', korean: '좋은' },
    { english: 'bad', korean: '나쁜' },
    { english: 'big', korean: '큰' },
    { english: 'small', korean: '작은' },
    { english: 'hot', korean: '뜨거운' },
    { english: 'cold', korean: '차가운' },
    { english: 'fast', korean: '빠른' },
    { english: 'slow', korean: '느린' },
    { english: 'easy', korean: '쉬운' },
    { english: 'difficult', korean: '어려운' },
    { english: 'important', korean: '중요한' },
    { english: 'interesting', korean: '흥미로운' },
    { english: 'boring', korean: '지루한' },
    { english: 'new', korean: '새로운' },
    { english: 'old', korean: '오래된' },
    
    // 동사
    { english: 'go', korean: '가다' },
    { english: 'come', korean: '오다' },
    { english: 'eat', korean: '먹다' },
    { english: 'drink', korean: '마시다' },
    { english: 'sleep', korean: '자다' },
    { english: 'study', korean: '공부하다' },
    { english: 'read', korean: '읽다' },
    { english: 'write', korean: '쓰다' },
    { english: 'speak', korean: '말하다' },
    { english: 'listen', korean: '듣다' },
    { english: 'see', korean: '보다' },
    { english: 'watch', korean: '보다, 지켜보다' },
    { english: 'play', korean: '놀다, 연주하다' },
    { english: 'run', korean: '달리다' },
    { english: 'walk', korean: '걷다' },
    { english: 'sit', korean: '앉다' },
    { english: 'stand', korean: '서다' },
    { english: 'open', korean: '열다' },
    { english: 'close', korean: '닫다' },
    { english: 'buy', korean: '사다' },
    
    // 장소
    { english: 'home', korean: '집' },
    { english: 'office', korean: '사무실' },
    { english: 'hospital', korean: '병원' },
    { english: 'bank', korean: '은행' },
    { english: 'store', korean: '가게' },
    { english: 'restaurant', korean: '식당' },
    { english: 'hotel', korean: '호텔' },
    { english: 'park', korean: '공원' },
    { english: 'library', korean: '도서관' },
    { english: 'university', korean: '대학교' },
    { english: 'station', korean: '역' },
    { english: 'airport', korean: '공항' },
    { english: 'beach', korean: '해변' },
    { english: 'mountain', korean: '산' },
    { english: 'city', korean: '도시' },
    
    // 기타 유용한 단어들
    { english: 'people', korean: '사람들' },
    { english: 'man', korean: '남자' },
    { english: 'woman', korean: '여자' },
    { english: 'child', korean: '아이' },
    { english: 'student', korean: '학생' },
    { english: 'teacher', korean: '선생님' },
    { english: 'doctor', korean: '의사' },
    { english: 'love', korean: '사랑' },
    { english: 'hope', korean: '희망' },
    { english: 'dream', korean: '꿈' },
    { english: 'health', korean: '건강' },
    { english: 'peace', korean: '평화' }
];

// DOM 요소들
const screens = {
    main: document.getElementById('main-screen'),
    test: document.getElementById('test-screen'),
    result: document.getElementById('result-screen'),
    wordManagement: document.getElementById('word-management-screen'),
    records: document.getElementById('records-screen')
};

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    // Firebase 초기화
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    
    initializeApp();
    setupEventListeners();
});

// 2025년 6월의 랜덤 날짜 생성 함수
function generateRandomJuneDate() {
    const year = 2025;
    const month = 5; // 6월 (0부터 시작)
    const day = Math.floor(Math.random() * 30) + 1; // 1~30일
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
    
    return new Date(year, month, day, hour, minute, second).toISOString();
}

function initializeApp() {
    showScreen('main-screen');
    loadDataFromFirebase();
}

// Firebase에서 데이터 로드
function loadDataFromFirebase() {
    // 단어 목록 로드
    database.ref('word_list').once('value', (snapshot) => {
        const firebaseWords = snapshot.val();
        if (firebaseWords && Array.isArray(firebaseWords)) {
            words = firebaseWords.map(word => ({
                english: word.english,
                korean: word.korean,
                dateAdded: word.date,
                rate: word.rate || 0
            }));
        } else {
            // Firebase에 데이터가 없으면 기본 단어로 초기화
            words = defaultWords.map(word => ({
                ...word,
                dateAdded: word.dateAdded || generateRandomJuneDate(),
                rate: 0
            }));
            saveWordsToFirebase();
        }
        updateWordList();
        updateMainStats();
    });

    // 시험 기록 로드
    database.ref('exam_list').once('value', (snapshot) => {
        const firebaseRecords = snapshot.val();
        if (firebaseRecords && Array.isArray(firebaseRecords)) {
            testRecords = firebaseRecords.map(record => ({
                date: record.date,
                score: record.test.filter(t => t.correct).length,
                total: record.test.length,
                details: record.test
            }));
        } else {
            testRecords = [];
        }
        updateRecordsList();
        updateMainStats();
        updateWordRates(); // 정답률 업데이트
    });
}

function setupEventListeners() {
    // 메인 화면 버튼들
    document.getElementById('start-test-btn').addEventListener('click', startTest);
    document.getElementById('manage-words-btn').addEventListener('click', () => showScreen('word-management-screen'));
    document.getElementById('view-records-btn').addEventListener('click', () => showScreen('records-screen'));
    
    // 뒤로가기 버튼들
    document.getElementById('back-to-main').addEventListener('click', () => showScreen('main-screen'));
    document.getElementById('back-to-main-from-result').addEventListener('click', () => showScreen('main-screen'));
    document.getElementById('back-to-main-from-words').addEventListener('click', () => showScreen('main-screen'));
    document.getElementById('back-to-main-from-records').addEventListener('click', () => showScreen('main-screen'));
    
    // 시험 관련 버튼들
    document.getElementById('show-meaning-btn').addEventListener('click', showMeaning);
    document.getElementById('correct-btn').addEventListener('click', () => answerQuestion(true));
    document.getElementById('wrong-btn').addEventListener('click', () => answerQuestion(false));
    
    // 단어 관리 관련
    document.getElementById('show-add-form-btn').addEventListener('click', showAddForm);
    document.getElementById('add-word-btn').addEventListener('click', addWord);
    document.getElementById('cancel-add-btn').addEventListener('click', hideAddForm);
    document.getElementById('english-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('korean-input').focus();
        }
    });
    document.getElementById('korean-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addWord();
        }
    });
    
    // 정렬 관련
    document.getElementById('sort-by-date').addEventListener('click', () => setSortMode('date'));
    document.getElementById('sort-by-accuracy').addEventListener('click', () => setSortMode('accuracy'));
    
    // 모달 관련
    document.getElementById('close-modal').addEventListener('click', closeRecordDetailModal);
    document.getElementById('record-detail-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeRecordDetailModal();
        }
    });
}

function showScreen(screenId) {
    // 모든 화면 숨기기
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 선택된 화면 보이기
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
    
    // 메인 화면으로 돌아갈 때 통계 업데이트
    if (screenId === 'main-screen') {
        updateMainStats();
    }
}

// Firebase에 단어 목록 저장
function saveWordsToFirebase() {
    const firebaseWords = words.map(word => ({
        english: word.english,
        korean: word.korean,
        date: word.dateAdded,
        rate: word.rate || 0
    }));
    
    database.ref('word_list').set(firebaseWords)
        .catch(error => {
            console.error('단어 저장 중 오류:', error);
            alert('단어 저장 중 오류가 발생했습니다.');
        });
}

// Firebase에 시험 기록 저장
function saveTestRecordToFirebase(testResult) {
    const record = {
        date: new Date().toLocaleString('ko-KR'),
        score: testResult.correct,
        total: testResult.total,
        details: testResult.details
    };
    
    // 메모리에도 추가
    testRecords.unshift(record);
    
    // 최대 50개 기록만 보관
    if (testRecords.length > 50) {
        testRecords.splice(50);
    }
    
    // Firebase에 저장할 형식
    const firebaseRecord = {
        date: record.date,
        test: record.details.map(detail => ({
            english: detail.english,
            korean: detail.korean,
            correct: detail.correct
        }))
    };
    
    // Firebase에 저장
    database.ref('exam_list').once('value', (snapshot) => {
        let examList = snapshot.val() || [];
        if (!Array.isArray(examList)) {
            examList = [];
        }
        examList.unshift(firebaseRecord);
        
        // 최대 50개 기록만 보관
        if (examList.length > 50) {
            examList.splice(50);
        }
        
        database.ref('exam_list').set(examList)
            .then(() => {
                updateWordRates(); // 정답률 업데이트
            })
            .catch(error => {
                console.error('시험 기록 저장 중 오류:', error);
                alert('시험 기록 저장 중 오류가 발생했습니다.');
            });
    });
}

// 단어별 정답률 계산 및 업데이트
function updateWordRates() {
    words.forEach(word => {
        const stats = calculateWordStats(word.english);
        word.rate = stats.rate;
    });
    
    // Firebase에 업데이트된 정답률 저장
    saveWordsToFirebase();
}

function saveWords() {
    saveWordsToFirebase();
}

function saveTestRecord(testResult) {
    saveTestRecordToFirebase(testResult);
}

function startTest() {
    if (words.length < 10) {
        alert('시험을 시작하려면 최소 10개의 단어가 필요합니다.');
        return;
    }
    
    // 랜덤하게 10개 단어 선택
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    currentTest.questions = shuffled.slice(0, 10);
    currentTest.currentIndex = 0;
    currentTest.answers = [];
    
    showScreen('test-screen');
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    const questionCounter = document.getElementById('question-counter');
    const englishWord = document.getElementById('english-word');
    const koreanMeaning = document.getElementById('korean-meaning');
    const showMeaningBtn = document.getElementById('show-meaning-btn');
    const answerButtons = document.getElementById('answer-buttons');
    
    questionCounter.textContent = `${currentTest.currentIndex + 1}/10`;
    englishWord.textContent = currentTest.questions[currentTest.currentIndex].english;
    
    // 초기 상태로 리셋
    koreanMeaning.classList.add('hidden');
    answerButtons.classList.add('hidden');
    showMeaningBtn.classList.remove('hidden');
    showMeaningBtn.disabled = false;
}

function showMeaning() {
    const koreanMeaning = document.getElementById('korean-meaning');
    const showMeaningBtn = document.getElementById('show-meaning-btn');
    const answerButtons = document.getElementById('answer-buttons');
    
    koreanMeaning.textContent = currentTest.questions[currentTest.currentIndex].korean;
    koreanMeaning.classList.remove('hidden');
    answerButtons.classList.remove('hidden');
    showMeaningBtn.classList.add('hidden');
}

function answerQuestion(isCorrect) {
    const currentQuestion = currentTest.questions[currentTest.currentIndex];
    currentTest.answers.push({
        english: currentQuestion.english,
        korean: currentQuestion.korean,
        correct: isCorrect
    });
    
    currentTest.currentIndex++;
    
    if (currentTest.currentIndex < currentTest.questions.length) {
        displayCurrentQuestion();
    } else {
        showTestResult();
    }
}

function showTestResult() {
    const correctCount = currentTest.answers.filter(answer => answer.correct).length;
    const totalCount = currentTest.answers.length;
    
    // 결과 요약 표시
    const scoreSummary = document.getElementById('score-summary');
    scoreSummary.innerHTML = `
        <div>총 ${totalCount}문제 중 ${correctCount}문제 정답</div>
        <div>정답률: ${Math.round((correctCount / totalCount) * 100)}%</div>
    `;
    
    // 상세 결과 표시
    const resultTable = document.getElementById('result-table');
    resultTable.innerHTML = currentTest.answers.map((answer, index) => `
        <div class="result-item">
            <div>
                <strong>${answer.english}</strong> - ${answer.korean}
            </div>
            <div class="${answer.correct ? 'result-correct' : 'result-wrong'}">
                ${answer.correct ? '정답' : '오답'}
            </div>
        </div>
    `).join('');
    
    // 시험 기록 저장
    saveTestRecord({
        correct: correctCount,
        total: totalCount,
        details: currentTest.answers
    });
    
    showScreen('result-screen');
    updateRecordsList();
    updateMainStats();
}

function showAddForm() {
    const wordInputSection = document.getElementById('word-input-section');
    const showAddFormBtn = document.getElementById('show-add-form-btn');
    
    wordInputSection.classList.remove('hidden');
    showAddFormBtn.style.display = 'none';
    
    // 첫 번째 입력 필드에 포커스
    document.getElementById('english-input').focus();
}

function hideAddForm() {
    const wordInputSection = document.getElementById('word-input-section');
    const showAddFormBtn = document.getElementById('show-add-form-btn');
    const englishInput = document.getElementById('english-input');
    const koreanInput = document.getElementById('korean-input');
    
    wordInputSection.classList.add('hidden');
    showAddFormBtn.style.display = '';
    
    // 입력 필드 초기화
    englishInput.value = '';
    koreanInput.value = '';
}

function addWord() {
    const englishInput = document.getElementById('english-input');
    const koreanInput = document.getElementById('korean-input');
    
    const englishWord = englishInput.value.trim();
    const koreanWord = koreanInput.value.trim();
    
    if (!englishWord || !koreanWord) {
        alert('영어 단어와 한글 뜻을 모두 입력해주세요.');
        return;
    }
    
    // 중복 체크
    if (words.some(word => word.english.toLowerCase() === englishWord.toLowerCase())) {
        alert('이미 존재하는 단어입니다.');
        return;
    }
    
    words.unshift({
        english: englishWord,
        korean: koreanWord,
        dateAdded: new Date().toISOString(),
        rate: 0
    });
    
    saveWords();
    updateWordList();
    
    // 성공적으로 추가 후 폼 숨기기
    hideAddForm();
    
    // 메인 통계 업데이트
    updateMainStats();
    
    // 성공 메시지 (선택사항)
    alert('단어가 성공적으로 추가되었습니다!');
}

function editWord(index) {
    const wordItem = document.getElementById(`word-item-${index}`);
    const englishDiv = document.getElementById(`english-${index}`);
    const koreanDiv = document.getElementById(`korean-${index}`);
    const wordButtons = wordItem.querySelector('.word-buttons');
    
    const currentEnglish = words[index].english;
    const currentKorean = words[index].korean;
    
    // 편집 모드로 전환
    englishDiv.innerHTML = `<input type="text" id="edit-english-${index}" value="${currentEnglish}" class="edit-input">`;
    koreanDiv.innerHTML = `<input type="text" id="edit-korean-${index}" value="${currentKorean}" class="edit-input">`;
    
    wordButtons.innerHTML = `
        <button class="save-btn" onclick="saveWordEdit(${index})">저장</button>
        <button class="cancel-btn" onclick="cancelWordEdit(${index})">취소</button>
    `;
    
    // 첫 번째 입력 필드에 포커스
    document.getElementById(`edit-english-${index}`).focus();
}

function saveWordEdit(index) {
    const englishInput = document.getElementById(`edit-english-${index}`);
    const koreanInput = document.getElementById(`edit-korean-${index}`);
    
    const newEnglish = englishInput.value.trim();
    const newKorean = koreanInput.value.trim();
    
    if (!newEnglish || !newKorean) {
        alert('영어 단어와 한글 뜻을 모두 입력해주세요.');
        return;
    }
    
    // 중복 체크 (현재 단어 제외)
    const isDuplicate = words.some((word, i) => 
        i !== index && word.english.toLowerCase() === newEnglish.toLowerCase()
    );
    
    if (isDuplicate) {
        alert('이미 존재하는 단어입니다.');
        return;
    }
    
    // 단어 업데이트
    words[index] = {
        english: newEnglish,
        korean: newKorean,
        dateAdded: words[index].dateAdded, // 기존 등록일자 유지
        rate: words[index].rate || 0 // 기존 정답률 유지
    };
    
    saveWords();
    updateWordList();
    updateMainStats();
    alert('단어가 성공적으로 수정되었습니다!');
}

function cancelWordEdit(index) {
    updateWordList(); // 원래 상태로 복원
}

function deleteWord(index) {
    if (confirm('정말로 이 단어를 삭제하시겠습니까?')) {
        words.splice(index, 1);
        saveWords();
        updateWordList();
        updateMainStats();
    }
}

function calculateWordStats(englishWord) {
    let totalAppearances = 0;
    let correctCount = 0;
    
    testRecords.forEach(record => {
        record.details.forEach(detail => {
            if (detail.english.toLowerCase() === englishWord.toLowerCase()) {
                totalAppearances++;
                if (detail.correct) {
                    correctCount++;
                }
            }
        });
    });
    
    if (totalAppearances === 0) {
        return { rate: 0, appearances: 0 };
    }
    
    return {
        rate: Math.round((correctCount / totalAppearances) * 100),
        appearances: totalAppearances
    };
}

function setSortMode(mode) {
    currentSortMode = mode;
    
    // 버튼 활성화 상태 업데이트
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (mode === 'date') {
        document.getElementById('sort-by-date').classList.add('active');
    } else {
        document.getElementById('sort-by-accuracy').classList.add('active');
    }
    
    updateWordList();
}

function sortWords(wordsToSort) {
    if (currentSortMode === 'date') {
        // 등록순: 최근 등록된 것이 위에 (내림차순)
        return wordsToSort.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else {
        // 정답률순: 0%가 맨 위, 낮은 정답률 순, 정답률 없는 것들이 맨 아래
        return wordsToSort.sort((a, b) => {
            const statsA = calculateWordStats(a.english);
            const statsB = calculateWordStats(b.english);
            
            // Firebase에서 저장된 정답률 우선 사용, 없으면 계산된 정답률 사용
            const rateA = statsA.appearances > 0 ? statsA.rate : (a.rate || 0);
            const rateB = statsB.appearances > 0 ? statsB.rate : (b.rate || 0);
            
            // 둘 다 정답률이 0이면 등록순으로
            if (rateA === 0 && rateB === 0) {
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            } else if (rateA === 0) {
                return 1; // A가 아래에 (B가 위에)
            } else if (rateB === 0) {
                return -1; // B가 아래에 (A가 위에)
            } else {
                // 둘 다 정답률이 있으면 낮은 순으로
                return rateA - rateB;
            }
        });
    }
}

function updateWordList() {
    const wordList = document.getElementById('word-list');
    
    if (words.length === 0) {
        wordList.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">등록된 단어가 없습니다.</div>';
        return;
    }
    
    // 원본 배열의 인덱스를 유지하면서 정렬
    const wordsWithOriginalIndex = words.map((word, index) => ({
        ...word,
        originalIndex: index
    }));
    
    const sortedWords = sortWords(wordsWithOriginalIndex);
    
    wordList.innerHTML = sortedWords.map((word) => {
        const stats = calculateWordStats(word.english);
        const statsText = stats.appearances > 0 ? `${stats.rate}%` : (word.rate > 0 ? `${word.rate}%` : '-');
        const dateAdded = new Date(word.dateAdded).toLocaleDateString('ko-KR');
        
        return `
        <div class="word-item" id="word-item-${word.originalIndex}">
            <div class="word-info">
                <div class="word-english" id="english-${word.originalIndex}">${word.english}</div>
                <div class="word-korean" id="korean-${word.originalIndex}">${word.korean}</div>
                <div class="word-meta">
                    <span class="word-date">등록일: ${dateAdded}</span>
                    <span class="word-stats">정답률: ${statsText}</span>
                </div>
            </div>
            <div class="word-buttons">
                <button class="edit-btn" onclick="editWord(${word.originalIndex})">편집</button>
                <button class="delete-btn" onclick="deleteWord(${word.originalIndex})">삭제</button>
            </div>
        </div>
        `;
    }).join('');
}

function showRecordDetail(recordIndex) {
    const record = testRecords[recordIndex];
    
    if (!record) return;
    
    // 모달 제목 설정
    document.getElementById('modal-title').textContent = `시험 기록 - ${record.date}`;
    
    // 점수 요약 설정
    const modalScoreSummary = document.getElementById('modal-score-summary');
    modalScoreSummary.innerHTML = `
        <div style="text-align: center; font-size: 1.3em; margin-bottom: 20px; color: #667eea;">
            <div>총 ${record.total}문제 중 ${record.score}문제 정답</div>
            <div>정답률: ${Math.round((record.score / record.total) * 100)}%</div>
        </div>
    `;
    
    // 상세 결과 표시
    const modalResultTable = document.getElementById('modal-result-table');
    modalResultTable.innerHTML = `
        <div style="background: #f8f9fa; border-radius: 10px; padding: 20px;">
            ${record.details.map((detail, index) => `
                <div class="result-item">
                    <div>
                        <strong>${detail.english}</strong> - ${detail.korean}
                    </div>
                    <div class="${detail.correct ? 'result-correct' : 'result-wrong'}">
                        ${detail.correct ? '정답' : '오답'}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // 모달 표시
    document.getElementById('record-detail-modal').classList.add('show');
}

function closeRecordDetailModal() {
    document.getElementById('record-detail-modal').classList.remove('show');
}

function updateMainStats() {
    const totalWords = words.length;
    const totalTests = testRecords.length;
    
    // 평균 정답률 계산
    let averageAccuracy = '-';
    if (totalTests > 0) {
        const totalAccuracy = testRecords.reduce((sum, record) => {
            const accuracy = (record.score / record.total) * 100;
            return sum + accuracy;
        }, 0);
        averageAccuracy = Math.round(totalAccuracy / totalTests) + '%';
    }
    
    // DOM 업데이트
    document.getElementById('total-words').textContent = totalWords;
    document.getElementById('total-tests').textContent = totalTests;
    document.getElementById('average-accuracy').textContent = averageAccuracy;
}

function updateRecordsList() {
    const recordsList = document.getElementById('records-list');
    
    if (testRecords.length === 0) {
        recordsList.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">시험 기록이 없습니다.</div>';
        return;
    }
    
    recordsList.innerHTML = testRecords.map((record, index) => `
        <div class="record-item" onclick="showRecordDetail(${index})">
            <div class="record-date">${record.date}</div>
            <div class="record-score">점수: ${record.score}/${record.total}점 (${Math.round((record.score / record.total) * 100)}%)</div>
            <div class="record-details">
                정답: ${record.details.filter(d => d.correct).length}개, 
                오답: ${record.details.filter(d => !d.correct).length}개
            </div>
            <div style="font-size: 0.8em; color: #999; margin-top: 8px;">클릭하여 상세 결과 보기</div>
        </div>
    `).join('');
} 