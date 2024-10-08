// Farklı ödeme yöntemlerini yönetmek için Strategy Pattern kullanıldı. 
// Kullanıcı PayPal ya da Kredi Kartı ile ödeme yaparken, bu ödeme yöntemleri strateji olarak ele alındı.
// Strategy Pattern, bir işlemi gerçekleştirmek için kullanılacak algoritmayı dinamik olarak değiştirebilmenizi sağlar. Farklı ödeme yöntemlerini tek bir yapı içinde değiştirilebilir hale getirir.

class PayPalPayment {
    processPayment(amount) {
      return { method: 'PayPal', amount };
    }
  }
  
  class CreditCardPayment {
    processPayment(amount) {
      return { method: 'Credit Card', amount };
    }
  }
  
  class PaymentContext {
    constructor() {
      this.strategy = null;
    }
  
    setStrategy(strategy) {
      this.strategy = strategy;
    }
  
    pay(amount) {
      if (this.strategy) {
        return this.strategy.processPayment(amount);
      } else {
        throw new Error('No payment method selected');
      }
    }
  }
  
  export { PayPalPayment, CreditCardPayment, PaymentContext };
  