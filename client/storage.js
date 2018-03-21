export function getCredentials () {
  return {
    username: window.localStorage.username,
    password: window.localStorage.password
  }
}

export function setCredentials (username, password) {
  window.localStorage.setItem('username', username)
  window.localStorage.setItem('password', password)
}
