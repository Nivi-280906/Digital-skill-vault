/* ================= THEME SYNC ================= */

document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.remove("light","dark");
  document.body.classList.add(theme);
});

/* ================= FIREBASE ================= */

const auth = firebase.auth();
const db = firebase.firestore();

const CLOUD_NAME = "dinkenzbi";
const UPLOAD_PRESET = "skillvault";

const drop = document.getElementById("drop");
const fileInput = document.getElementById("file");
const skill = document.getElementById("skill");
const otherSkill = document.getElementById("otherSkill");
const bar = document.getElementById("bar");
const uploadBtn = document.getElementById("uploadBtn");

let selectedFile = null;
let uploading = false;

/* Auth */
auth.onAuthStateChanged(user=>{
  if(!user) location="login.html";
});

/* Pick file */
drop.onclick = ()=>fileInput.click();

fileInput.onchange = e=>{
  selectedFile = e.target.files[0];
  if(selectedFile) drop.innerText = selectedFile.name;
};

/* Other skill */
skill.onchange = ()=>{
  otherSkill.style.display = skill.value==="Other" ? "block":"none";
};

/* Upload */
uploadBtn.onclick = uploadCert;

function uploadCert(){

  if(uploading) return;
  uploading=true;

  const title=document.getElementById("title").value.trim();
  const level=document.getElementById("level").value;
  const desc=document.getElementById("desc").value;

  let finalSkill=skill.value;
  if(finalSkill==="Other") finalSkill=otherSkill.value.trim();

  if(!selectedFile||!title||!finalSkill||!level){
    alert("Fill all fields + choose file");
    uploading=false;
    return;
  }

  const user=auth.currentUser;
  if(!user){
    alert("Login again");
    uploading=false;
    return;
  }

  bar.style.width="10%";

  const form=new FormData();
  form.append("file",selectedFile);
  form.append("upload_preset",UPLOAD_PRESET);

  fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,{
    method:"POST",
    body:form
  })
  .then(r=>r.json())
  .then(data=>{

    if(!data.secure_url) throw "Upload failed";

    bar.style.width="100%";

    return db.collection("certificates").add({
      uid:user.uid,
      title,
      skill:finalSkill,
      level,
      desc,
      file:data.secure_url,
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    });

  })
  .then(()=>{
    alert("Uploaded Successfully");
    parent.document.getElementById("uploadFrameModal").style.display="none";
  })
  .catch(e=>{
    console.error(e);
    alert("Upload failed");
  })
  .finally(()=>{
    uploading=false;
  });
}
