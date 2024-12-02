// UserFactory, kullanıcının rolüne göre (Admin ya da Guest) farklı kullanıcı nesneleri oluşturmak için kullanıldı. 
// Giriş yapılırken, kullanıcının rolü belirlenir ve buna göre Admin veya Guest nesnesi oluşturulur.
// Factory Pattern, belirli bir role veya duruma göre farklı nesneler oluşturmak için kullanılır. Bu desenle nesnelerin oluşturulma mantığı soyutlanır ve hangi tür nesnenin oluşturulacağı dinamik olarak belirlenir.

import { AdminDecorator, GuestDecorator, User } from '../decorator/UserRoles';

class UserFactory {
  static createUser(name, role) {
    const user = new User(name);
    if (role === 'Admin') {
      return new AdminDecorator(user);
    } else if (role === 'Guest') {
      return new GuestDecorator(user);
    } else {
      throw new Error('Unknown user role');
    }
  }
}

export default UserFactory;
