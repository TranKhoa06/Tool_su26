
// Hiệu ứng Typewriter cho Màn hình chờ
function typeWriter(elementId, text, i, cb) {
    if (i < text.length) {
        document.getElementById(elementId).innerHTML = text.substring(0, i+1) + '<span style="opacity: 0.5;">_</span>';
        setTimeout(function() { typeWriter(elementId, text, i + 1, cb) }, 20);
    } else {
        document.getElementById(elementId).innerHTML = text;
        if(cb) cb();
    }
}

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        const twText = document.getElementById('typewriter-text');
        const text = "> Khởi tạo hệ thống học tập...\n> Tải dữ liệu môn học [OK]\n> Thiết lập kết nối bảo mật [OK]\n> Chuẩn bị không gian mạng...";
        twText.innerHTML = '';
        setTimeout(() => {
            typeWriter('typewriter-text', text, 0, () => {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => preloader.style.display = 'none', 800);
                }, 1500);
            });
        }, 300);
    }
});

function scrollToGrid() {
    const grid = document.getElementById('main-content');
    if(grid) grid.scrollIntoView({ behavior: 'smooth' });
}

function filterSubjects(val) {
    val = val.toLowerCase();
    document.querySelectorAll('.subject-card').forEach(card => {
        if (card.innerText.toLowerCase().includes(val)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

let quizData = [];
let currentIndex = 0;
let quizScore = 0;
let currentTab = 'flashcard-3d';
let answeredQuiz = false;
let currentSubjectId = '';

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    if(window.renderSubjects) window.renderSubjects();
});

// Ă p dá»¥ng quyá» n truy cáº­p
window.applyPermissions = function() {
    const perms = window.userPermissions || [];
    window.subjectRegistry.map(s => s.id).forEach(subId => {
        const btn = document.querySelector(`.subject-card[onclick*='${subId}']`);
        if(btn) {
            if(perms.includes(subId)) {
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer'; btn.style.pointerEvents = 'auto';
                const lockIcon = btn.querySelector('.lock-icon');
                if(lockIcon) lockIcon.remove();
            } else {
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed'; btn.style.pointerEvents = 'none';
                if(!btn.querySelector('.lock-icon')) {
                    if(!btn.querySelector('.lock-icon')) btn.innerHTML += `<div class="lock-icon" style="position:absolute; top:15px; right:15px; color:#ef4444; font-size:1.5rem;"><i class='bx bxs-lock'></i></div>`;
                }
            }
        }
    });
};

function loadSubject(subjectId, subjectName) {
    // Kiá»ƒm tra quyá»n
    if (window.userPermissions && !window.userPermissions.includes(subjectId)) {
        alert("Bạn chưa được cấp quyền truy cập môn học này. Vui lòng liên hệ Admin!");
        return;
    }

    const script = document.createElement('script');
    script.src = `data/${subjectId}.js`;
    script.onload = () => {
        if (window.studyData && window.studyData[subjectId]) {
            quizData = window.studyData[subjectId];
            currentSubjectId = subjectId;
            document.getElementById('current-subject-title').innerText = subjectName;
            document.getElementById('home-view').classList.add('hidden');
            document.getElementById('study-view').classList.remove('hidden');
            
            // XĂ¡o trá»™n dá»¯ liá»‡u
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
    
    // áº¨n táº¥t cáº£ ná»™i dung
    document.getElementById('view-flashcard-3d').classList.add('hidden');
    document.getElementById('view-flashcard-reveal').classList.add('hidden');
    document.getElementById('view-quiz').classList.add('hidden');

    // Hiá»‡n ná»™i dung tÆ°Æ¡ng á»©ng
    document.getElementById(`view-${tabId}`).classList.remove('hidden');
    
    // Cáº­p nháº­t tráº¡ng thĂ¡i nĂºt tab
    const tabs = ['flashcard-3d', 'flashcard-reveal', 'quiz'];
    const tabPrefix = { 'flashcard-3d': 'fc3d', 'flashcard-reveal': 'fcrev', 'quiz': 'quiz' };
    
    tabs.forEach((tab, index) => {
        const btn = document.getElementById(`tab-${tabPrefix[tab]}`);
        if (btn) {
            if (tab === tabId) {
                btn.classList.add('active');
                // Cáº­p nháº­t vá»‹ trĂ­ slider (chá»‰ cháº¡y trĂªn Desktop náº¿u mĂ n hĂ¬nh to)
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
    
    // Xá»­ lĂ½ táº¡o ná»™i dung cho CĂ¢u há»i (cĂ³ thá»ƒ lĂ  Chá»¯ hoáº·c áº¢nh)
    let termHTML = currentQ.type === 'image' && currentQ.question_img 
        ? `<img src="${currentQ.question_img}" alt="Question Image" class="question-img" />`
        : currentQ.term;
        
    // Xá»­ lĂ½ táº¡o ná»™i dung cho ÄĂ¡p Ă¡n (cĂ³ thá»ƒ lĂ  Chá»¯ hoáº·c áº¢nh)
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
        
        // ÄĂ³ng tháº» náº¿u Ä‘ang má»Ÿ
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
        
        // áº¨n Ä‘Ă¡p Ă¡n
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

// Click vĂ o tháº» 3D Ä‘á»ƒ láº­t
document.getElementById('flashcard-3d')?.addEventListener('click', toggleFlashcard3D);

// --- Quiz ---
function loadQuiz() {
    if (quizData.length === 0) return;
    const currentQ = quizData[currentIndex];
    answeredQuiz = false;

    document.getElementById('quiz-counter').innerText = `CĂ¢u: ${currentIndex + 1}/${quizData.length}`;
    document.getElementById('quiz-score').innerText = `Äiá»ƒm: ${quizScore}`;
    
    let termHTML = currentQ.type === 'image' && currentQ.question_img 
        ? `<img src="${currentQ.question_img}" alt="Question Image" class="question-img" />`
        : currentQ.term;
        
    document.getElementById('quiz-question').innerHTML = termHTML;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('div');
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
        document.getElementById('quiz-score').innerText = `Äiá»ƒm: ${quizScore}`;
    } else {
        btn.classList.add('incorrect');
        // Highlight cĂ¢u Ä‘Ăºng
        const allBtns = document.getElementById('quiz-options').querySelectorAll('button');
        if(allBtns[currentQ.answerIndex]) {
            allBtns[currentQ.answerIndex].classList.add('correct');
        }
    }

    // VĂ´ hiá»‡u hĂ³a nĂºt
    document.getElementById('quiz-options').querySelectorAll('button').forEach(b => b.disabled = true);
    document.getElementById('btn-next-quiz').classList.remove('hidden');
    
    // Hiá»‡n giáº£i thĂ­ch (báº±ng áº£nh hoáº·c chá»¯)
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
        alert(`Báº¡n Ä‘Ă£ hoĂ n thĂ nh bĂ i thi! Äiá»ƒm cá»§a báº¡n: ${quizScore}/${quizData.length}`);
        if (window.saveScoreToCloud) {
            window.saveScoreToCloud(currentSubjectId, quizScore, quizData.length);
        }
    }
}

function prevQuiz() {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuiz();
    }
}

// --- Báº¯t sá»± kiá»‡n phĂ­m táº¯t ---
document.addEventListener('keydown', (e) => {
    // Chá»‰ hoáº¡t Ä‘á»™ng khi Ä‘ang á»Ÿ mĂ n hĂ¬nh há»c táº­p
    if (document.getElementById('study-view').classList.contains('hidden')) return;

    // PhĂ­m Space Ä‘á»ƒ láº­t tháº» / xem giáº£i thĂ­ch
    if (e.code === 'Space') {
        e.preventDefault();
        if (currentTab === 'flashcard-3d') {
            document.getElementById('flashcard-3d').classList.toggle('is-flipped');
        } else if (currentTab === 'flashcard-reveal') {
            revealAnswer();
        }
    } 
    // PhĂ­m MÅ©i tĂªn Pháº£i (Next)
    else if (e.code === 'ArrowRight') {
        if (currentTab === 'quiz') {
            // Trong quiz chá»‰ cho qua bĂ i náº¿u nĂºt next Ä‘ang hiá»‡n (Ä‘Ă£ tráº£ lá»i)
            if(!document.getElementById('btn-next-quiz').classList.contains('hidden')) {
                nextQuiz();
            }
        } else {
            nextCard();
        }
    } 
    // PhĂ­m MÅ©i tĂªn TrĂ¡i (Prev)
    else if (e.code === 'ArrowLeft') {
        if (currentTab === 'quiz') {
            prevQuiz();
        } else {
            prevCard();
        }
    }
});


// Admin Logic
window.showAdminPanel = function() {
    document.getElementById('main-content').classList.add('hidden');
      const hero = document.getElementById('hero-section'); if(hero) hero.classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    window.loadUsersForAdmin();
};

window.hideAdminPanel = function() {
    document.getElementById('admin-dashboard').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
      const hero = document.getElementById('hero-section'); if(hero) hero.classList.remove('hidden');
};

window.loadUsersForAdmin = async function() {
    if (!window.isAdmin) return;
    const tbody = document.getElementById('users-table-body');
    if(!tbody) return;
    tbody.innerHTML = '<tr><td colspan="4">Đang t?i d? li?u...</td></tr>';
    
    try {
        const usersSnap = await window.getDocs(window.collection(window.db, "users"));
        tbody.innerHTML = '';
        usersSnap.forEach(doc => {
            const data = doc.data();
            const perms = data.permissions || ['dic201'];
            const tr = document.createElement('tr');
            tr.innerHTML = "<td><img src='" + data.avatar + "' style='width:32px;height:32px;border-radius:50%;vertical-align:middle;margin-right:10px;' alt=''><strong>" + data.name + "</strong></td><td>" + data.email + "</td><td><div style='display:flex;gap:15px;'><label><input type='checkbox' id='perm-dic201-" + data.uid + "' checked disabled> DIC201 (Mặc định)</label><label><input type='checkbox' id='perm-mcp201-" + data.uid + "' " + (perms.includes('mcp201') ? 'checked' : '') + "> MCP201</label><label><input type='checkbox' id='perm-csd202-" + data.uid + "' " + (perms.includes('csd202') ? 'checked' : '') + "> CSD202</label></div></td><td><button class='btn-inline' onclick='savePermissions(\"" + data.uid + "\")'>Lưu Quyền</button></td>";
            tbody.appendChild(tr);
        });
    } catch(e) {
        tbody.innerHTML = "<tr><td colspan='4' style='color:red'>L?i t?i d? li?u: " + e.message + "</td></tr>";
    }
};

window.savePermissions = async function(uid) {
    const newPerms = window.subjectRegistry.filter(s => s.isDefault).map(s => s.id);
    window.subjectRegistry.forEach(sub => {
        if(!sub.isDefault) {
            const cb = document.getElementById('perm-' + sub.id + '-' + uid);
            if(cb && cb.checked) newPerms.push(sub.id);
        }
    });
    try {
        const userRef = window.doc(window.db, "users", uid);
        await window.updateDoc(userRef, { permissions: newPerms });
        alert('Cập nhật quyền thành công!');
    } catch(e) {
        alert('Lỗi cập nhật: ' + e.message);
    }
};


window.renderSubjects = function() {
    const list = document.getElementById('subject-list');
    if(!list || !window.subjectRegistry) return;
    list.innerHTML = '';
    window.subjectRegistry.forEach(sub => {
        const btn = document.createElement('div');
        btn.className = 'subject-card';
        btn.onclick = () => loadSubject(sub.id, sub.name);
        btn.innerHTML = `<div class='card-icon ${sub.iconClass}'><i class='bx ${sub.icon}'></i></div><h3>${sub.id.toUpperCase()}</h3><p>${sub.name}</p><div class='card-arrow'><i class='bx bx-right-arrow-alt'></i></div>`;
        list.appendChild(btn);
    });
    if(window.userPermissions) window.applyPermissions();
};
