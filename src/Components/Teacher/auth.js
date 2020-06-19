class Auth {
  constructor() {
    this.authenticated = null;
  }
  login(token) {
    const teacher = token.split(" ")[0];
    if (teacher === "Teacher") this.authenticated = token;
  }
  logout() {
    this.authenticated = null;
  }
  isAuthenticated() {
    return this.authenticated;
  }
}
export default new Auth();
