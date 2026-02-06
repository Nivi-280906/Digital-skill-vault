// Apply saved theme on load
window.onload = () => {

  let saved = localStorage.getItem("theme") || "light";

  document.body.classList.remove("light","dark");
  document.body.classList.add(saved);

  updateIcon(saved);
};

// Toggle theme
function toggleTheme(){

  let isDark = document.body.classList.contains("dark");

  let next = isDark ? "light" : "dark";

  document.body.classList.remove("light","dark");
  document.body.classList.add(next);

  localStorage.setItem("theme", next);

  updateIcon(next);
}

// Change icon
function updateIcon(mode){

  const icon = document.getElementById("themeIcon");
  if(!icon) return;

  icon.innerText = mode === "dark" ? "☀️" : "🌙";
}
