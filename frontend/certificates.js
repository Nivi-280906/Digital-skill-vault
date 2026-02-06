const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user=>{
if(!user){
location="login.html";
return;
}
loadCertificates(user.uid);
});

function loadCertificates(uid){

db.collection("certificates")
.where("uid","==",uid)
.get()
.then(snapshot=>{

const box=document.getElementById("certContainer");
box.innerHTML="";

if(snapshot.empty){
box.innerHTML="<p>No certificates yet</p>";
return;
}

snapshot.forEach(doc=>{
const c=doc.data();

box.innerHTML+=`
<div class="cert-card">

<div class="cert-info">
<h4>${c.title}</h4>
<p>${c.skill} • ${c.level}</p>

<span class="${c.verified?'verified':'pending'}">
${c.verified?'Verified':'Pending'}
</span>
</div>

<div class="cert-actions">
<button class="view-btn" onclick="viewCert('${c.file}')">View</button>
<button class="del-btn" onclick="deleteCert('${doc.id}')">Delete</button>
</div>

</div>
`;

});

});
}

function viewCert(url){
document.getElementById("viewModal").style.display="flex";
document.getElementById("certFrame").src=url;
}

function closeViewer(){
document.getElementById("viewModal").style.display="none";
document.getElementById("certFrame").src="";
}

function deleteCert(id){
if(confirm("Delete certificate?")){
db.collection("certificates").doc(id).delete().then(()=>location.reload());
}
}

function logout(){
auth.signOut().then(()=>location="login.html");
}
