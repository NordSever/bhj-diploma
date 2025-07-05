/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, responce) => {
      if(responce && responce.success) {
        this.element.reset();
        App.setState('user-logged');

        const modalId = this.element.closest('.modal').id;
        const modalKey = modalId.replace('modal-', '');
        App.getModal(modalKey).close();
      
      } else {
        console.error('Ошибка авторизации:', err || response.error);
      }
    }
    )
  }
}