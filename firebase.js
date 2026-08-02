import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById('btn-login');
    const userProfile = document.getElementById('user-profile');
    
    if (user) {
        window.currentUser = user;
        if(loginBtn) loginBtn.classList.add('hidden');
        if(userProfile) {
            userProfile.classList.remove('hidden');
            document.getElementById('user-name').innerText = user.displayName;
            document.getElementById('user-avatar').src = user.photoURL;
        }
    } else {
        window.currentUser = null;
        if(loginBtn) loginBtn.classList.remove('hidden');
        if(userProfile) userProfile.classList.add('hidden');
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
