let quizData = [];
let currentIndex = 0;
let quizScore = 0;
let currentTab = 'flashcard-3d';
let answeredQuiz = false;
let currentSubjectId = '';

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    // Không load ngay, đợi user chọn môn
});

function loadSubject(subjectId, subjectName) {
    const script = document.createElement('script');
    script.src = `data/${subjectId}.js`;
    script.onload = () => {
        if (window.studyData && window.studyData[subjectId]) {
            quizData = window.studyData[subjectId];
            currentSubjectId = subjectId;
            document.getElementById('current-subject-title').innerText = subjectName;
            document.getElementById('home-view').classList.add('hidden');
            document.getElementById('study-view').classList.remove('hidden');
            
            // Xáo trộn dữ liệu
            quizData = quizData.sort(() => Math.random() - 0.5);
            
            currentIndex = 0;
            quizScore = 0;
            switchTab('flashcard-3d');
        } else {
            alert('Lỗi tải dữ liệu!');
        }
    };
    script.onerror = () => alert(`Không tìm thấy file data/${subjectId}.js`);
    document.body.appendChild(script);
}

function goHome() {
    document.getElementById('study-view').classList.add('hidden');
    document.getElementById('home-view').classList.remove('hidden');
    quizData = [];
}

function switchTab(tabId) {
    currentTab = tabId;
    
    // Ẩn tất cả nội dung
    document.getElementById('view-flashcard-3d').classList.add('hidden');
    document.getElementById('view-flashcard-reveal').classList.add('hidden');
    document.getElementById('view-quiz').classList.add('hidden');

    // Hiện nội dung tương ứng
    document.getElementById(`view-${tabId}`).classList.remove('hidden');
    
    // Cập nhật trạng thái nút tab
    const tabs = ['flashcard-3d', 'flashcard-reveal', 'quiz'];
    const tabPrefix = { 'flashcard-3d': 'fc3d', 'flashcard-reveal': 'fcrev', 'quiz': 'quiz' };
    
    tabs.forEach((tab, index) => {
        const btn = document.getElementById(`tab-${tabPrefix[tab]}`);
        if (btn) {
            if (tab === tabId) {
                btn.classList.add('active');
                // Cập nhật vị trí slider (chỉ chạy trên Desktop nếu màn hình to)
                const slider = document.getElementById('tab-slider');
                if(slider) {
                    slider.style.transform = `translateX(${index * 100}%)`;
                }
            } else {
                btn.classList.remove('active');
            }
        }
    });

    if (tabId === 'quiz') {
        loadQuiz();
    } else {
        loadFlashcard();
    }
}

function revealAnswer() {
    if (currentTab === 'flashcard-reveal') {
        document.getElementById('fcrev-answer').classList.remove('hidden');
        document.getElementById('fcrev-hint').classList.add('hidden');
    }
}

// --- Flashcard Chung ---
function loadFlashcard() {
    if (quizData.length === 0) return;
    const currentQ = quizData[currentIndex];
    
    // Xử lý tạo nội dung cho Câu hỏi (có thể là Chữ hoặc Ảnh)
    let termHTML = currentQ.type === 'image' && currentQ.question_img 
        ? `<img src="${currentQ.question_img}" alt="Question Image" class="question-img" />`
        : currentQ.term;
        
    // Xử lý tạo nội dung cho Đáp án (có thể là Chữ hoặc Ảnh)
    let defHTML = currentQ.type === 'image' && currentQ.answer_img
        ? `<img src="${currentQ.answer_img}" alt="Answer Image" class="answer-img" />`
        : currentQ.definition;

    if (currentTab === 'flashcard-3d') {
        document.getElementById('fc3d-counter').innerText = `${currentIndex + 1} / ${quizData.length}`;
        document.getElementById('fc3d-term').innerHTML = termHTML;
        const optionsList = document.getElementById('fc3d-options');
        optionsList.innerHTML = '';
        if (currentQ.type !== 'image') {
            currentQ.options.forEach(opt => {
                const div = document.createElement('div');
                div.className = 'fc-option';
                div.innerText = opt;
                optionsList.appendChild(div);
            });
        }
        document.getElementById('fc3d-definition').innerHTML = defHTML;
        
        // Đóng thẻ nếu đang mở
        const card = document.getElementById('flashcard-3d');
        card.classList.remove('is-flipped');
    } 
    else if (currentTab === 'flashcard-reveal') {
        document.getElementById('fcrev-counter').innerText = `${currentIndex + 1} / ${quizData.length}`;
        document.getElementById('fcrev-term').innerHTML = termHTML;
        const optionsList = document.getElementById('fcrev-options');
        optionsList.innerHTML = '';
        if (currentQ.type !== 'image') {
            currentQ.options.forEach(opt => {
                const div = document.createElement('div');
                div.className = 'fc-option';
                div.innerText = opt;
                optionsList.appendChild(div);
            });
        }
        document.getElementById('fcrev-definition').innerHTML = defHTML;
        
        // Ẩn đáp án
        document.getElementById('fcrev-answer').classList.add('hidden');
        document.getElementById('fcrev-hint').classList.remove('hidden');
    }
}

function nextCard(type) {
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        loadFlashcard();
    }
}

function prevCard(type) {
    if (currentIndex > 0) {
        currentIndex--;
        loadFlashcard();
    }
}

function toggleFlashcard3D() {
    const card = document.getElementById('flashcard-3d');
    card.classList.toggle('is-flipped');
}

// Click vào thẻ 3D để lật
document.getElementById('flashcard-3d')?.addEventListener('click', toggleFlashcard3D);

// --- Quiz ---
function loadQuiz() {
    if (quizData.length === 0) return;
    const currentQ = quizData[currentIndex];
    answeredQuiz = false;

    document.getElementById('quiz-counter').innerText = `Câu: ${currentIndex + 1}/${quizData.length}`;
    document.getElementById('quiz-score').innerText = `Điểm: ${quizScore}`;
    
    let termHTML = currentQ.type === 'image' && currentQ.question_img 
        ? `<img src="${currentQ.question_img}" alt="Question Image" class="question-img" />`
        : currentQ.term;
        
    document.getElementById('quiz-question').innerHTML = termHTML;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'quiz-option-btn';
        btn.onclick = () => selectAnswer(idx, btn);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('btn-next-quiz').classList.add('hidden');
    document.getElementById('quiz-reveal-answer').classList.add('hidden');
}

function selectAnswer(selectedIndex, btn) {
    if (answeredQuiz) return;
    answeredQuiz = true;

    const currentQ = quizData[currentIndex];
    const isCorrect = selectedIndex === currentQ.answerIndex;

    if (isCorrect) {
        btn.classList.add('correct');
        quizScore++;
        document.getElementById('quiz-score').innerText = `Điểm: ${quizScore}`;
    } else {
        btn.classList.add('incorrect');
        // Highlight câu đúng
        const allBtns = document.getElementById('quiz-options').querySelectorAll('button');
        if(allBtns[currentQ.answerIndex]) {
            allBtns[currentQ.answerIndex].classList.add('correct');
        }
    }

    // Vô hiệu hóa nút
    document.getElementById('quiz-options').querySelectorAll('button').forEach(b => b.disabled = true);
    document.getElementById('btn-next-quiz').classList.remove('hidden');
    
    // Hiện giải thích (bằng ảnh hoặc chữ)
    document.getElementById('quiz-reveal-answer').classList.remove('hidden');
    let defHTML = currentQ.type === 'image' && currentQ.answer_img
        ? `<img src="${currentQ.answer_img}" alt="Answer Image" class="answer-img" />`
        : currentQ.definition;
    document.getElementById('quiz-explanation').innerHTML = defHTML;
}

function nextQuiz() {
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        loadQuiz();
    } else {
        alert(`Bạn đã hoàn thành bài thi! Điểm của bạn: ${quizScore}/${quizData.length}`);
        if (window.saveScoreToCloud) {
            window.saveScoreToCloud(currentSubjectId, quizScore, quizData.length);
        }
    }
}

// --- Bắt sự kiện phím tắt ---
document.addEventListener('keydown', (e) => {
    if (document.getElementById('study-view').classList.contains('hidden')) return;

    if (currentTab === 'flashcard-3d') {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleFlashcard3D();
        } else if (e.code === 'ArrowRight') {
            nextCard('fc3d');
        } else if (e.code === 'ArrowLeft') {
            prevCard('fc3d');
        }
    } 
    else if (currentTab === 'flashcard-reveal') {
        if (e.code === 'Space') {
            e.preventDefault();
            revealFlashcard();
        } else if (e.code === 'ArrowRight') {
            nextCard('fcrev');
        } else if (e.code === 'ArrowLeft') {
            prevCard('fcrev');
        }
    }
});
