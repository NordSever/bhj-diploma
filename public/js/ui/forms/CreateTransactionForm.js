/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');
    
    select.innerHTML = '';

    
    Account.list({}, (err, response) => {
      if (response && response.success) {
        response.data.forEach(account => {
          const option = document.createElement('option');
          option.value = account.id;
          option.textContent = account.name;
          select.appendChild(option);
        });
      }
    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response && response.success) {
        App.update();
        this.element.reset();

        // const modal = App.getModal('createAccount');
        // if (modal) {
        //   modal.close();
        // }

        const modalKey = this.element.closest('.modal').id === 'modal-new-income' ? 'newIncome' : 'newExpense';;
        // const modalKey = modalId.replace('modal-', '');
        // console.log(modalKey);
        App.getModal(modalKey).close();

        
      } else {
        console.error('Ошибка:', err);
      }
    })

  }
}