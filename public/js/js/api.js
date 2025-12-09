// public/js/api.js
const API_BASE_URL = "http://localhost:5000/api";

// ---------- AUTH HELPERS ----------
function saveAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// ---------- API WRAPPER ----------
async function apiRequest(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, options);

  let data = {};
  try {
    data = await response.json();
  } catch (e) {
    // ignore if no JSON
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// Simple guard
function requireAuth(redirectTo = "login.html") {
  if (!getToken()) {
    window.location.href = redirectTo;
  }
}

// Check admin
function requireAdmin(redirectTo = "index.html") {
  const user = getUser();
  if (!user || user.role !== "admin") {
    window.location.href = redirectTo;
  }
}
