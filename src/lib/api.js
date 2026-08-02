const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export const authStore = {
  get accessToken() {
    return localStorage.getItem('firstclient_access_token') || 'mock-access-token'
  },
  setSession(session) {
    localStorage.setItem('firstclient_access_token', session.accessToken)
    localStorage.setItem('firstclient_refresh_token', session.refreshToken)
    localStorage.setItem('firstclient_user', JSON.stringify(session.user))
  },
  clear() {
    localStorage.removeItem('firstclient_access_token')
    localStorage.removeItem('firstclient_refresh_token')
    localStorage.removeItem('firstclient_user')
  },
}

export async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(authStore.accessToken ? { Authorization: `Bearer ${authStore.accessToken}` } : {}),
      ...options.headers,
    },
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.message ?? 'Request failed')
  return payload.data
}
