// Ödeme işlemlerini yönetmek ve geri alınabilir (undo) hale getirmek için Command Pattern kullanıldı. 
// Her ödeme işlemi bir "komut" olarak ele alınır ve bu komut daha sonra geri alınabilir.
// Command Pattern, bir işlemi kapsüller ve bu işlemin daha sonra geri alınabilir olmasını sağlar. Örneğin, ödeme yapıldığında bu işlem bir "komut" olarak işlenir ve daha sonra geri alınabilir.
class PaymentCommand {
    constructor(paymentContext, amount) {
      this.paymentContext = paymentContext;
      this.amount = amount;
      this.executed = false;
    }
  
    execute() {
      if (!this.executed) {
        this.paymentContext.pay(this.amount);
        this.executed = true;
      }
    }
  
    undo() {
      if (this.executed) {
        console.log(`Undo payment of ${this.amount}`);
        this.executed = false;
      }
    }
  }
  
  export default PaymentCommand;
  