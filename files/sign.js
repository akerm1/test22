// Toggle between Sign In and Sign Up panels
const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNTDHR67L48F1nPReRs2dSoQ-PxgNKWYM",
  authDomain: "login2-d485e.firebaseapp.com",
  projectId: "login2-d485e",
  storageBucket: "login2-d485e.appspot.com",
  messagingSenderId: "602998933832",
  appId: "1:602998933832:web:a397944522901f3c12cb7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign up form submission
const signUpForm = document.getElementById('signUpForm');
const signUpStatus = document.getElementById('signUpStatus');
const signInForm = document.getElementById('signInForm');
const signInStatus = document.getElementById('signInStatus');

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Signed up as:', user.email);
            signUpStatus.textContent = 'Sign up successful';
            signUpStatus.style.color = 'green';
            container.classList.remove("right-panel-active");
            signInForm.scrollIntoView({ behavior: "smooth" });
        })
        .catch((error) => {
            console.error(error.message);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    signUpStatus.textContent = 'Email is already in use';
                    break;
                case 'auth/invalid-email':
                    signUpStatus.textContent = 'Invalid email address';
                    break;
                case 'auth/weak-password':
                    signUpStatus.textContent = 'Password is too weak';
                    break;
                default:
                    signUpStatus.textContent = 'Error: ' + error.message;
            }
            signUpStatus.style.color = 'red';
        });
});

// Sign in form submission
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Signed in as:', user.email);
        signInStatus.textContent = 'Sign in successful';
        signInStatus.style.color = 'green';

        // Redirect after successful sign-in
        window.location.href = 'https://akerm1.github.io/test22/index.html';
    } catch (error) {
        console.error(error.message);
        signInStatus.textContent = 'Sign in failed: ' + error.message;
        signInStatus.style.color = 'red';
    }
});


// Example usage
signInUser(email, password);





