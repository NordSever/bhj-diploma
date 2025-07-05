/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const buttonSidebar = document.querySelector('[data-toggle="push-menu"]');
    // const buttonSidebar = document.querySelector('.sidebar-toggle');
    
    buttonSidebar.addEventListener('click', (event) => {
      event.preventDefault();
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    // Находим все ссылки в боковом меню авторизации
    const registerLink = document.querySelector('.menu-item_register a');
    const loginLink = document.querySelector('.menu-item_login a');
    const logoutLink = document.querySelector('.menu-item_logout a');

    // Обработчик для кнопки "Регистрация"
    if (registerLink) {
      registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('register');
        if (modal) {
          modal.open();
        }
      });
    }

    // Обработчик для кнопки "Войти"
    if (loginLink) {
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('login');
        if (modal) {
          modal.open();
        }
      });
    }

    // Обработчик для кнопки "Выйти"
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState('init');
          }
        });
      });
    }
  }
}