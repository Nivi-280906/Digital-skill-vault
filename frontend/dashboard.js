const auth = firebase.auth();
const db = firebase.firestore();

/* ================= AUTH ================= */

auth.onAuthStateChanged(user => {

  if(!user){
    location.href = "login.html";
    return;
  }

  userName.innerText = user.displayName || "Student";
  userEmail.innerText = user.email;

  if(user.photoURL){
    avatarImg.src = user.photoURL;
    avatarImg.style.display = "flex";
    avatarFallback.style.display = "none";
  }else{
    avatarFallback.innerText = user.email[0].toUpperCase();
    avatarFallback.style.display = "flex";
    avatarImg.style.display = "none";
  }

  strengthBar.style.width = "0%";
  strengthBar.style.background = "#d1d5db";
  strengthText.innerText = "0%";

  updateLearningStatus();
  loadCertificates(user.uid);
});

/* ================= LEARNING STATUS ================= */

function updateLearningStatus(){

  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem("lastVisit");

  if(lastVisit === today){
    learningStatus.innerText = "Active";
    learningStatus.className = "status-active";
  }else{
    learningStatus.innerText = "Inactive";
    learningStatus.className = "status-inactive";
  }

  localStorage.setItem("lastVisit", today);
}

/* ================= LOAD CERTIFICATES ================= */

function loadCertificates(uid){

  db.collection("certificates")
  .where("uid","==",uid)
  .onSnapshot(snapshot => {

    let verifiedCount = 0;
    let skillsSet = new Set();

    certList.innerHTML = "";

    snapshot.forEach(doc => {

      const d = doc.data();

      if(d.verified === true) verifiedCount++;
      if(d.skill) skillsSet.add(d.skill);

      const date = d.createdAt?.toDate().toLocaleDateString() || "";
      const levelClass = (d.level || "").toLowerCase();

      // IMPORTANT: upload.js saves as "file"
      const fileUrl = d.file || "";

      certList.innerHTML += `
      <div class="cert-row" onclick="openCert('${fileUrl}')">

        <div class="cert-left">
          <div class="cert-icon">📄</div>

          <div>
            <div class="cert-title">${d.title || "Certificate"}</div>

            <div class="cert-tags">
              <span class="tag">${d.skill || ""}</span>
              <span class="tag ${levelClass}">${d.level || ""}</span>
            </div>
          </div>
        </div>

        <div class="cert-date">${date}</div>
      </div>
      `;
    });

    totalCerts.innerText = snapshot.size;
    verified.innerText = verifiedCount;
    skills.innerText = skillsSet.size;

    let strength = verifiedCount * 0.2;
    if(strength > 100) strength = 100;
    strength = strength.toFixed(1);

    if(verifiedCount == 0){
      strengthBar.style.width = "0%";
      strengthBar.style.background = "#d1d5db";
      strengthText.innerText = "0%";
    }else{
      strengthBar.style.width = strength + "%";
      strengthBar.style.background = "#0ea5e9";
      strengthText.innerText = strength + "%";
    }
  });
}

/* ================= OPEN CERT ================= */

function openCert(url){

  if(!url){
    alert("No certificate file linked");
    return;
  }

  window.open(url, "_blank");
}

/* ================= PROFILE ================= */

function openProfile(){
  profileModal.style.display = "flex";

  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      profileName.value = user.displayName || "";
    }
  });
}

function closeProfile(){
  profileModal.style.display = "none";
}

function saveProfile(){

  const name = profileName.value;

  firebase.auth().currentUser.updateProfile({
    displayName:name
  }).then(()=>{
    userName.innerText = name;
    closeProfile();
    alert("Profile Updated");
  });
}

/* ================= SETTINGS ================= */

function changePassword(){
  auth.sendPasswordResetEmail(auth.currentUser.email);
  alert("Reset link sent");
}

function toggleSettings(){
  settingsBox.style.display =
    settingsBox.style.display === "block" ? "none" : "block";
}

/* ================= AUTH ================= */

function logout(){
  auth.signOut();
}

/* ================= UPLOAD MODAL ================= */

function openUploadModal(){
  uploadFrameModal.style.display = "flex";
}

function closeUploadModal(){
  uploadFrameModal.style.display = "none";
}
