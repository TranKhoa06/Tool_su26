import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7_oM4JM2LRPPdnMy8uDn7ScXKSZEMIvc",
    authDomain: "tool-su26.firebaseapp.com",
    projectId: "tool-su26",
    storageBucket: "tool-su26.firebasestorage.app",
    messagingSenderId: "156291821622",
    appId: "1:156291821622:web:ceaca22eca799df0a4e897",
    measurementId: "G-Q5Z0RYB6W0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Expose firestore for admin use
window.db = db;
window.doc = doc;
window.getDoc = getDoc;
window.updateDoc = updateDoc;
window.collection = collection;
window.getDocs = getDocs;

const ADMIN_EMAIL = 'azultruong@gmail.com';

// Attach to window so standard HTML buttons can call them
window.loginAsUser = () => {
    window.intendedRole = 'user';
    const btn = document.getElementById('btn-login-user');
    if(btn) { btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Đang kết nối..."; btn.disabled = true; }
    
    signInWithPopup(auth, provider).catch(error => {
        alert("Đăng nhập thất bại: " + error.message);
        if(btn) { btn.innerHTML = "<i class='bx bxs-user-detail'></i> Đang nhập Học viên"; btn.disabled = false; }
    });
};

window.loginAsAdmin = () => {
    window.intendedRole = 'admin';
    const btn = document.getElementById('btn-login-admin');
    if(btn) { btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Đang kết nối..."; btn.disabled = true; }
    
    signInWithPopup(auth, provider).catch(error => {
        alert("Đăng nhập thất bại: " + error.message);
        if(btn) { btn.innerHTML = "<i class='bx bxs-shield'></i> Đăng nhập Admin"; btn.disabled = false; }
    });
};

window.logout = () => {
    signOut(auth);
};

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
    const userProfile = document.getElementById('user-profile');
    const mainContent = document.getElementById('main-content');
    const loginPrompt = document.getElementById('login-prompt');
    const btnUser = document.getElementById('btn-login-user');
    const btnAdmin = document.getElementById('btn-login-admin');
    const topLoginBtn = document.getElementById('btn-login'); // if it still exists
    
    if (user) {
        window.currentUser = user;
        // Validate admin login attempt
        if (window.intendedRole === 'admin' && user.email !== ADMIN_EMAIL) {
            alert("🔒 Từ chối truy cập: Tài khoản của bạn không có quyền Quản trị viên.");
            signOut(auth);
            return;
        }
        
        // Save user to Firestore if not exists, default permission: dic201
        let permissions = window.subjectRegistry ? window.subjectRegistry.filter(s => s.isDefault).map(s => s.id) : ['dic201'];
        try {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    avatar: user.photoURL,
                    permissions: permissions,
                    createdAt: serverTimestamp()
                });
            } else {
                permissions = userSnap.data().permissions || (window.subjectRegistry ? window.subjectRegistry.filter(s => s.isDefault).map(s => s.id) : ['dic201']);
            }
        } catch (error) {
            console.error("Firestore error:", error);
            alert("Lỗi cơ sở dữ liệu: " + error.message + ". Vui lòng liên hệ Admin bật Cloud Firestore.");
        }
        
        window.userPermissions = permissions;
        window.isAdmin = user.email === ADMIN_EMAIL;
        
        if (typeof window.applyPermissions === 'function') {
            window.applyPermissions();
        }
        
        const authUnlogged = document.getElementById('auth-unlogged');
        if(authUnlogged) authUnlogged.classList.add('hidden');
        const loginSug = document.getElementById('login-suggestion');
        if(loginSug) loginSug.classList.add('hidden');
        if(userProfile) {
            userProfile.classList.remove('hidden');
            document.getElementById('user-name').innerText = user.displayName;
            document.getElementById('user-avatar').src = user.photoURL;
            
            const badge = document.querySelector('.user-badge');
            const adminPanelBtn = document.getElementById('btn-admin-panel');
            
            if (badge) {
                if (window.isAdmin) {
                    badge.innerText = 'Admin';
                    badge.style.background = '#fecaca';
                    badge.style.color = '#b91c1c';
                    if(adminPanelBtn) adminPanelBtn.classList.remove('hidden');
                } else {
                    badge.innerText = 'Học viên';
                    badge.style.background = 'var(--primary-light)';
                    badge.style.color = 'var(--primary)';
                    if(adminPanelBtn) adminPanelBtn.classList.add('hidden');
                }
            }
        }
        
        // Show correct dashboard based on intended role if applicable
        const adminDashboard = document.getElementById('admin-dashboard');
        if (window.isAdmin && window.intendedRole === 'admin') {
            if(mainContent) mainContent.classList.add('hidden');
            if(adminDashboard) adminDashboard.classList.remove('hidden');
            // load admin users here
            if(window.loadUsersForAdmin) window.loadUsersForAdmin();
        } else {
            if(mainContent) mainContent.classList.remove('hidden');
            if(adminDashboard) adminDashboard.classList.add('hidden');
        }
        
        if(loginPrompt) loginPrompt.classList.add('hidden');
        
    } else {
        window.currentUser = null;
        window.userPermissions = [];
        window.isAdmin = false;
        const authUnlogged = document.getElementById('auth-unlogged');
        if(authUnlogged) authUnlogged.classList.remove('hidden');
        const loginSug = document.getElementById('login-suggestion');
        if(loginSug) loginSug.classList.remove('hidden');
        if(userProfile) userProfile.classList.add('hidden');
        if(mainContent) mainContent.classList.add('hidden');
        if(loginPrompt) loginPrompt.classList.remove('hidden');
        
        if(window.location.pathname.includes('admin.html')) {
            document.getElementById('admin-content').classList.add('hidden');
            document.getElementById('admin-login-prompt').classList.remove('hidden');
        }
    }
});

// Function to save score
window.saveScoreToCloud = async (subjectId, score, total) => {
    if (!window.currentUser) {
        console.log("User not logged in, score not saved to cloud.");
        return;
    }
    
    try {
        const userRef = doc(db, "users", window.currentUser.uid, "scores", subjectId);
        await setDoc(userRef, {
            score: score,
            total: total,
            lastPlayed: serverTimestamp()
        }, { merge: true });
        console.log("Đã lưu điểm số lên Cloud thành công!");
    } catch (e) {
        console.error("Lỗi khi lưu điểm: ", e);
    }
};
