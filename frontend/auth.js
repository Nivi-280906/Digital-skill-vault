const auth = firebase.auth();

/* ================= SIGNUP ================= */

if(document.getElementById("signupForm")){

  const signupForm = document.getElementById("signupForm");
  const googleBtn = document.getElementById("googleBtn");

  // Email + password signup
  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
  });

  // Google signup (FORCE account picker)
  googleBtn.onclick = () => {

    const provider = new firebase.auth.GoogleAuthProvider();

    // 🔴 THIS IS THE IMPORTANT LINE
    provider.setCustomParameters({
      prompt: "select_account"
    });

    auth.signInWithPopup(provider)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
  };

}


/* ================= LOGIN ================= */

if(document.getElementById("loginForm")){

  const loginForm = document.getElementById("loginForm");
  const googleLogin = document.getElementById("googleLogin");

  // Email + password login
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
  });

  // Google login (normal behavior – auto login allowed)
  googleLogin.onclick = () => {

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
  };

}
