/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if(response && response.success) {
        this.element.reset();

        const modal = App.getModal('createAccount');
        if (modal) {
          modal.close();
        }

        // const modalId = this.element.closest('.modal').id;
        // const modalKey = modalId.replace('modal-', '');
        // App.getModal(modalKey).close();

        App.update();
      } else {
        // Выводим ошибку в консоль при неудачной регистрации
        console.error('Ошибка при создании счёта:', err);
        // console.error('Ошибка при создании счёта:', err || response.error);
      }
    })
  }
}