// Kullanıcının oturum açma ve kapama durumlarını yönetmek için State Pattern kullanıldı. 
// Kullanıcı oturum açtığında LoggedInState, oturumu kapattığında ise LoggedOutState devreye girer.
// State Pattern, bir nesnenin durumuna göre davranışlarını değiştirir. Kullanıcı oturum açtığında veya kapattığında uygulamanın davranışını değiştirmek için kullanılır.

class UserState {
    constructor(userContext) {
      this.userContext = userContext;
    }
  
    login(name) {
      throw new Error('This method should be overridden.');
    }
  
    logout() {
      throw new Error('This method should be overridden.');
    }
  }
  
  class LoggedOutState extends UserState { // kullanıcı oturum kapattı
    login(name) {
      this.userContext.setState(this.userContext.loggedInState);
      console.log(`${name} logged in`);
    }
  
    logout() {
      console.log('Already logged out');
    }
  }
  
  class LoggedInState extends UserState { // kullanıcı oturum açtı
    logout() {
      this.userContext.setState(this.userContext.loggedOutState);
      console.log('User logged out');
    }
  
    login() {
      console.log('Already logged in');
    }
  }
  
  class UserContext {
    constructor() {
      this.loggedInState = new LoggedInState(this);
      this.loggedOutState = new LoggedOutState(this);
      this.state = this.loggedOutState; // Başlangıç durumu: oturum kapalı
    }
  
    setState(newState) {
      this.state = newState;
    }
  
    login(name) {
      this.state.login(name);
    }
  
    logout() {
      this.state.logout();
    }
  }
  
  export { UserContext };
  