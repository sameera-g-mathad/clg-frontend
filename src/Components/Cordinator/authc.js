class AuthC {
  constructor() {
    this.authenticated = sessionStorage.getItem("cordinatorToken") || null;
  }
  loginC(token) {
    const teacher = token.split(" ")[0];
    if (teacher === "Cordinator") this.authenticated = token;
  }
  logoutC() {
    this.authenticated = null;
  }
  isAuthenticatedC() {
    return this.authenticated;
  }
}
export default new AuthC();
