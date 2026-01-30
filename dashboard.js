const firebaseConfig = {
  apiKey: "AIzaSyAAj_buWFwMZb0QwOdebH-FpurUGemoWmg",
  authDomain: "skillvault-93232.firebaseapp.com",
  projectId: "skillvault-93232",
  storageBucket: "skillvault-93232.firebasestorage.app",
  messagingSenderId: "817089906854",
  appId: "1:817089906854:web:1abe810f7efbd5b4fc0c67"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// DOM
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const avatar = document.getElementById("avatar");
const skillCount = document.getElementById("skillCount");

// AUTH CHECK
auth.onAuthStateChanged(user=>{
if(!user){
window.location.replace("login.html");
return;
}

// SHOW PROFILE
userName.innerText = user.displayName || "User";
userEmail.innerText = user.email;
avatar.innerText = user.email.charAt(0).toUpperCase();

// OPTIONAL SKILL COUNT
db.collection("skills")
.where("uid","==",user.uid)
.onSnapshot(snap=>{
skillCount.innerText = snap.size;
});

});

function logout(){
auth.signOut().then(()=>{
window.location.replace("index.html");
});
}
