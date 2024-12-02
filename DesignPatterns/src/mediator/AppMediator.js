class AppMediator {
    constructor() {
      this.user = null;
      this.paymentContext = null;
      this.themeManager = null;
    }
  
    registerUser(user) {
      this.user = user;
    }
  
    registerPaymentContext(paymentContext) {
      this.paymentContext = paymentContext;
    }
  
    registerThemeManager(themeManager) {
      this.themeManager = themeManager;
    }
  
    login(name, role) {
      if (!this.user) {
        console.log('No user registered.');
        return;
      }
      this.user.login(name, role);
    }
  
    logout() {
      if (this.user) {
        this.user.logout();
      }
    }
  
    changeTheme() {
      if (this.themeManager) {
        const newTheme = this.themeManager.getTheme() === 'light' ? 'dark' : 'light';
        this.themeManager.setTheme(newTheme);
      }
    }
  
    makePayment(amount) {
      if (this.paymentContext) {
        return this.paymentContext.pay(amount);
      }
    }
  }
  
  export default AppMediator;
  