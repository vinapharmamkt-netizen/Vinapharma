/**
 * Vinapharma Auth Client
 * Quản lý Access Token + Refresh Token tự động
 * - Access token: lưu trong memory (biến JS)
 * - Refresh token: httpOnly cookie (tự động gửi)
 */

const AuthClient = (() => {
  const API = 'https://vinapharma.onrender.com';
  let _accessToken = null;
  let _user        = null;
  let _refreshing  = null; // Promise đang refresh (tránh gọi nhiều lần)

  // ── Khởi tạo: thử lấy user từ refresh token khi load trang ──
  async function init() {
    // Thử restore từ localStorage (tab reload)
    const saved = localStorage.getItem('vp_access');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        _accessToken = p.token;
        _user        = p.user;
        return _user;
      } catch(e) {}
    }
    // Thử refresh từ cookie
    return await _doRefresh();
  }

  // ── Refresh access token từ cookie ──
  async function _doRefresh() {
    if (_refreshing) return _refreshing;
    _refreshing = fetch(API + '/api/auth/refresh', {
      method: 'POST',
      credentials: 'include' // Gửi cookie
    })
    .then(r => r.json())
    .then(data => {
      _refreshing = null;
      if (data.success) {
        _accessToken = data.accessToken;
        _user        = data.user;
        localStorage.setItem('vp_access', JSON.stringify({ token: _accessToken, user: _user }));
        return _user;
      }
      _accessToken = null;
      _user        = null;
      localStorage.removeItem('vp_access');
      return null;
    })
    .catch(() => { _refreshing = null; return null; });
    return _refreshing;
  }

  // ── Fetch với tự động refresh khi 401 ──
  async function authFetch(url, options = {}) {
    if (!options.headers) options.headers = {};
    if (_accessToken) options.headers['Authorization'] = 'Bearer ' + _accessToken;
    options.credentials = 'include';

    let res = await fetch(url, options);

    // Access token hết hạn → thử refresh
    if (res.status === 401) {
      const body = await res.clone().json().catch(() => ({}));
      if (body.code === 'TOKEN_EXPIRED') {
        const user = await _doRefresh();
        if (user && _accessToken) {
          // Retry với token mới
          options.headers['Authorization'] = 'Bearer ' + _accessToken;
          res = await fetch(url, options);
        } else {
          // Refresh hết hạn → clear local state nhưng KHÔNG redirect
          // (để tránh văng ra khỏi trang admin)
          _accessToken = null;
          _user = null;
          localStorage.removeItem('vp_access');
          return res;
        }
      }
    }
    return res;
  }

  // ── Login ──
  async function login(identifier, password) {
    const res  = await fetch(API + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();
    if (data.success) {
      _accessToken = data.accessToken;
      _user        = data.user;
      localStorage.setItem('vp_access', JSON.stringify({ token: _accessToken, user: _user }));
    }
    return data;
  }

  // ── Register ──
  async function register(payload) {
    const res  = await fetch(API + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      _accessToken = data.accessToken;
      _user        = data.user;
      localStorage.setItem('vp_access', JSON.stringify({ token: _accessToken, user: _user }));
    }
    return data;
  }

  // ── Social login (Google/Facebook) ──
  async function socialLogin(provider, uid, email, name, avatar) {
    const res  = await fetch(API + '/api/auth/social-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ provider, uid, email, name, avatar })
    });
    const data = await res.json();
    if (data.success) {
      _accessToken = data.accessToken;
      _user        = data.user;
      localStorage.setItem('vp_access', JSON.stringify({ token: _accessToken, user: _user }));
    }
    return data;
  }

  // ── Logout ──
  async function _logout() {
    _accessToken = null;
    _user        = null;
    localStorage.removeItem('vp_access');
    await fetch(API + '/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    window.location.href = 'tai-khoan.html';
  }

  function logout() { return _logout(); }
  function getUser() { return _user; }
  function getToken() { return _accessToken; }
  function isLoggedIn() { return !!_user; }
  function isAdmin() { return _user?.role === 'admin'; }

  return { init, login, register, socialLogin, logout, authFetch, getUser, getToken, isLoggedIn, isAdmin };
})();

// Tự động init khi load trang
window.__vpAuthReady = AuthClient.init();
