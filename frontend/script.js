function login() {
  const name = document.getElementById("username").value.trim();
  if (name === "") {
    alert("Please enter your name!");
    return;
  }
  localStorage.setItem("internName", name);
  localStorage.setItem("donations", Math.floor(Math.random() * 6000 + 1000));
  window.location.href = "dashboard.html";
}

function loadDashboard() {
  fetch("https://intern-portal-backend-0br9.onrender.com/api/user")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("name").textContent = data.name;
      document.getElementById("referral").textContent = data.referralCode;
      document.getElementById("donations").textContent = `₹${data.donations}`;
    })
    .catch((err) => console.error("Failed to load dashboard data", err));
}

function loadName() {
  const name = localStorage.getItem("internName") || "Intern";
  document.getElementById("name").textContent = name;
  const donation = localStorage.getItem("donations") || 0;
  const donationElem = document.getElementById("donationSelf");
  if (donationElem) donationElem.textContent = donation;
}

function renderLeaderboard() {
  fetch("https://intern-portal-backend-0br9.onrender.com/api/leaderboard")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("leaderboardList");
      list.innerHTML = "";
      data.forEach((intern, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${intern.name} - ₹${intern.donations}`;
        list.appendChild(li);
      });

      const nameElement = document.getElementById("name");
      if (nameElement) nameElement.textContent = localStorage.getItem("internName") || "Intern";
    })
    .catch((err) => console.error("Failed to load leaderboard data", err));
}

