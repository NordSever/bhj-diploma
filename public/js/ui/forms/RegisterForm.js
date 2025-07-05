/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
   
    User.register(data, (err, response) => {
      
      if (response && response.success) {
        
        this.element.reset();

        App.setState('user-logged');

        // 
        // const modalElement = this.element.closest('.modal');
        // if (modalElement) {
        //   
        //   const modal = App.getModal(modalElement.id);
        //   if (modal) {
        //    
        //     modal.close();
        //   }
        // }
        const modalId = this.element.closest('.modal').id; // Получаем ID модалки
        const modalKey = modalId.replace('modal-', ''); // Преобразуем в ключ (register)
        App.getModal(modalKey).close();
      } else {
        console.error('Ошибка регистрации:', err || response.error);
        
      }
    });
  }
}