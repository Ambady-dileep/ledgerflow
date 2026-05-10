// src/utils/api.js
// All fetch calls go through here.
// Automatically attaches the Bearer token and silently refreshes it when expired.

const BASE = "http://127.0.0.1:8000/api";

// ── Token helpers ─────────────────────────────────────────────────────────────
export const getAccess  = () => localStorage.getItem("access_token");
export const getRefresh = () => localStorage.getItem("refresh_token");

export const saveTokens = (access, refresh) => {
  localStorage.setItem("access_token",  access);
  localStorage.setItem("refresh_token", refresh);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const isLoggedIn = () => Boolean(getAccess());


// ── Silent token refresh ───────────────────────────────────────────────────────
// Called automatically when the server returns 401 (access token expired).
async function refreshAccessToken() {
  const refresh = getRefresh();
  if (!refresh) return null;

  const res = await fetch(`${BASE}/token/refresh/`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    clearTokens();   // refresh token also expired → force re-login
    return null;
  }

  const data = await res.json();
  localStorage.setItem("access_token", data.access);
  return data.access;
}


// ── Core request ───────────────────────────────────────────────────────────────
async function request(endpoint, options = {}) {
  const token = getAccess();

  const buildHeaders = (t) => ({
    "Content-Type": "application/json",
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
    ...options.headers,
  });

  let res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers: buildHeaders(token),
  });

  // 401 → try a silent refresh, then retry once
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      window.location.href = "/login";
      return;
    }
    res = await fetch(`${BASE}${endpoint}`, {
      ...options,
      headers: buildHeaders(newToken),
    });
  }

  // 204 No Content (DELETE success) — return null, not an error
  if (res.status === 204) return null;

  const body = await res.json().catch(() => null);

  if (!res.ok) throw { status: res.status, data: body };

  return body;
}


// ── Convenience wrappers ───────────────────────────────────────────────────────
export const api = {
  get:    (url)       => request(url),
  post:   (url, body) => request(url, { method: "POST",   body: JSON.stringify(body) }),
  patch:  (url, body) => request(url, { method: "PATCH",  body: JSON.stringify(body) }),
  put:    (url, body) => request(url, { method: "PUT",    body: JSON.stringify(body) }),
  delete: (url)       => request(url, { method: "DELETE" }),
};