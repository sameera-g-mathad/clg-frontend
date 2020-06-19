class AuthS {
  constructor() {
    this.authenticated = null;
  }
  loginS(token) {
    const student = token.split(" ")[0];
    if (student === "Student") this.authenticated = token;
  }
  logoutS() {
    this.authenticated = null;
  }
  isAuthenticatedS() {
    return this.authenticated;
  }
}
export default new AuthS();
