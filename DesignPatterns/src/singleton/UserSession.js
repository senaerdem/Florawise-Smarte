// UserSession sınıfı, oturum açan kullanıcı bilgilerini yönetmek için kullanıldı. Uygulama boyunca kullanıcı oturumu ile ilgili veriler tek bir örnek (singleton) olarak tutulur.
// Singleton Pattern, yalnızca bir kez oluşturulan ve uygulamanın her yerinden erişilebilen bir sınıf sağlar. Bu sayede UserSession ile kullanıcı oturumu verilerini tüm uygulama boyunca tek bir noktada yönetiriz.
// Kullanıcı oturum açtığında UserSession sınıfında oturum bilgileri saklanır. Bu bilgi daha sonra herhangi bir yerden kullanılabilir.
class UserSession {
    static instance = null;
  
    constructor() {
      if (!UserSession.instance) {
        this.user = null;
        UserSession.instance = this;
      }
      return UserSession.instance;
    }
  
    setUser(user) {
      this.user = user;
    }
  
    getUser() {
      return this.user;
    }
  
    clearSession() {
      this.user = null;
    }
  }
  
  const userSession = new UserSession();
  Object.freeze(userSession);
  export default userSession;
  