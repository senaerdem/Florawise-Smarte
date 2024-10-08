// ThemeManager sınıfı, uygulamanın temasını ve dilini yönetir. 
// Tema veya dil değiştiğinde, değişikliklerin uygulamanın ilgili kısımlarına otomatik olarak yansımasını sağlamak için Observer Pattern kullanıldı.
// Observer Pattern, bir nesnenin durumu değiştiğinde, bu duruma bağlı diğer nesnelerin otomatik olarak güncellenmesini sağlar. Örneğin, kullanıcı temayı veya dili değiştirdiğinde, uygulamanın arayüzünde anında güncellemeler yapılır.

class ThemeManager {
    constructor() {
      this.observers = [];
      this.theme = 'light'; // Default theme
      this.language = 'en'; // Default language
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    setTheme(newTheme) { // tüm bileşenler yeni tema bilgilerini alır
      this.theme = newTheme;
      this.notifyObservers();
    }
  
    setLanguage(newLanguage) { // tüm bileşenler yeni dil bilgilerini alır
      this.language = newLanguage;
      this.notifyObservers();
    }
  
    notifyObservers() {
      this.observers.forEach(observer => observer.updateSettings(this.theme, this.language));
    }
  }
  
  const themeManager = new ThemeManager();
  export default themeManager;
  