const db = firebase.firestore();
const auth = firebase.auth();

function uploadSkill(){

const name = document.getElementById("skillName").value;

auth.onAuthStateChanged(user=>{
if(!user) return alert("Login first");

db.collection("skills").add({
uid:user.uid,
name:name,
created:firebase.firestore.FieldValue.serverTimestamp()
}).then(()=>{
alert("Uploaded");
document.getElementById("skillName").value="";
});
});
}
