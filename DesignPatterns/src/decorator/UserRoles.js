class User {
    constructor(name) {
      this.name = name;
    }
  
    getDetails() {
      return `User: ${this.name}`;
    }
  
    hasAccess() {
      return true;
    }
  }
  
  class UserDecorator {
    constructor(user) {
      this.user = user;
    }
  
    getDetails() {
      return this.user.getDetails();
    }
  
    hasAccess() {
      return this.user.hasAccess();
    }
  }
  
  class AdminDecorator extends UserDecorator {
    getDetails() {
      return `${super.getDetails()} (Admin)`;
    }
  
    hasAccess() {
      return true;
    }
  
    adminAction() {
      return 'Admin actions available';
    }
  }
  
  class GuestDecorator extends UserDecorator {
    getDetails() {
      return `${super.getDetails()} (Guest)`;
    }
  
    hasAccess() {
      return false;
    }
  
    guestMessage() {
      return 'Limited access for guests';
    }
  }
  
  export { User, AdminDecorator, GuestDecorator };
  