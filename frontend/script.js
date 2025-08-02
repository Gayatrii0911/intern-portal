function login() {
  const name = document.getElementById("username").value.trim();
  if (name === "") {
    alert("Please enter your name!");
    return;
  }
  localStorage.setItem("internName", name);
  localStorage.setItem("donations", Math.floor(Math.random() * 6000 + 1000));

  // ✅ Optional: ping backend to show it's used
  fetch("https://intern-portal-backend-0br9.onrender.com/api/user")
    .then(res => res.json())
    .then(data => console.log("Backend connected:", data))
    .catch(err => console.error("Backend error:", err));

  window.location.href = "dashboard.html";
}

function loadDashboard() {
  const name = localStorage.getItem("internName") || "Intern";
  const referral = name.toLowerCase().replace(/\s+/g, '') + "2025";
  const donations = localStorage.getItem("donations") || 0;

  document.getElementById("name").textContent = name;
  document.getElementById("referral").textContent = referral;
  document.getElementById("donations").textContent = donations;
}

function loadName() {
  const name = localStorage.getItem("internName") || "Intern";
  document.getElementById("name").textContent = name;
  const donation = localStorage.getItem("donations") || 0;
  const donationElem = document.getElementById("donationSelf");
  if (donationElem) donationElem.textContent = donation;
}

function renderLeaderboard() {
  const name = localStorage.getItem("internName") || "You";
  const donation = parseInt(localStorage.getItem("donations")) || 0;

  const interns = [
    { name: "Gayatri Mahajan", donations: 4200 },
    { name: "John Doe", donations: 3100 },
    { name: "Aisha Khan", donations: 2900 },
    { name: "Ravi Patel", donations: 2400 },
    { name: name, donations: donation, isUser: true }
  ];

  interns.sort((a, b) => b.donations - a.donations);

  const list = document.getElementById("leaderboardList");
  if (list) {
    list.innerHTML = "";
    interns.forEach((intern) => {
      const li = document.createElement("li");
      li.innerHTML = intern.isUser
        ? `<strong>You</strong> - ₹${intern.donations}`
        : `${intern.name} - ₹${intern.donations}`;
      list.appendChild(li);
    });
  }

  const nameElement = document.getElementById("name");
  if (nameElement) nameElement.textContent = name;
}
