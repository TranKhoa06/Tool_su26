import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7_oM4JM2LRPPdnMy8uDn7ScXKSZEMIVc",
    authDomain: "tool-su26.firebaseapp.com",
    projectId: "tool-su26",
    storageBucket: "tool-su26.firebasestorage.app",
    messagingSenderId: "156291821622",
    appId: "1:156291821622:web:ceaca22eca799df0a4e897"
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
window.loginWithGoogle = () => {
    signInWithPopup(auth, provider).catch(error => {
        console.error("Login failed", error);
        alert("Đăng nhập thất bại: " + error.message);
    });
};

window.logout = () => {
    signOut(auth);
};

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
    const loginBtn = document.getElementById('btn-login');
    const userProfile = document.getElementById('user-profile');
    const mainContent = document.getElementById('main-content');
    const loginPrompt = document.getElementById('login-prompt');
    
    if (user) {
        window.currentUser = user;
        
        // Save user to Firestore if not exists, default permission: dic201
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        let permissions = ['dic201']; // default
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
            permissions = userSnap.data().permissions || ['dic201'];
        }
        window.userPermissions = permissions;
        window.isAdmin = user.email === ADMIN_EMAIL;
        
        if (typeof window.applyPermissions === 'function') {
            window.applyPermissions();
        }
        
        if(loginBtn) loginBtn.classList.add('hidden');
        if(userProfile) {
            userProfile.classList.remove('hidden');
            document.getElementById('user-name').innerText = user.displayName;
            document.getElementById('user-avatar').src = user.photoURL;
        }
        if(mainContent) mainContent.classList.remove('hidden');
        if(loginPrompt) loginPrompt.classList.add('hidden');
        
        // If on admin page, check if admin
        if(window.location.pathname.includes('admin.html')) {
            if(!window.isAdmin) {
                alert('Bạn không có quyền truy cập trang này!');
                window.location.href = 'index.html';
            } else {
                if(typeof window.loadAdminData === 'function') window.loadAdminData();
            }
        }
        
    } else {
        window.currentUser = null;
        window.userPermissions = [];
        window.isAdmin = false;
        if(loginBtn) loginBtn.classList.remove('hidden');
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
