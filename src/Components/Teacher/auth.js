
class Auth
{
    constructor()
    {
        this.authenticated=null
    }
    login(token)
    {
        this.authenticated=token
    }
    logout()
    {
        this.authenticated=null
    }
    isAuthenticated()
    {
        return this.authenticated
    }
}
export default new Auth()