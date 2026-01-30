// SIGNUP
if(document.getElementById("signupForm")){
signupForm.addEventListener("submit",e=>{
e.preventDefault();

auth.createUserWithEmailAndPassword(
signup-email.value,
signup-password.value
)
.then(()=>location="dashboard.html")
.catch(err=>alert(err.message));
});

googleBtn.onclick=()=>{
auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
.then(()=>location="dashboard.html")
.catch(e=>alert(e.message));
};
}

// LOGIN
if(document.getElementById("loginForm")){
loginForm.addEventListener("submit",e=>{
e.preventDefault();

auth.signInWithEmailAndPassword(
login-email.value,
login-password.value
)
.then(()=>location="dashboard.html")
.catch(err=>alert(err.message));
});

googleLogin.onclick=()=>{
auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
.then(()=>location="dashboard.html")
.catch(e=>alert(e.message));
};
}
