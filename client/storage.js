export function getCredentials () {
  return {
    username: localStorage.username,
    password: localStorage.password
  }
}

export function setCredentials (username, password) {
  localStorage.setItem('username', username)
  localStorage.setItem('password', password)
}
