import { timeMinute, dateInput, password, errorMessage } from './domSelect.js';
import { checkPassword, checkDateInputFormat } from './utils.js';

[timeMinute, dateInput, password].forEach(inputItem => {
  inputItem.addEventListener('input', () => (errorMessage.textContent = ''));
});

const formController = async addData => {
  try {
    if (!(timeMinute.value && dateInput.value && password.value)) {
      errorMessage.textContent = 'Please fill in all the fields above!';
      return;
    }

    const timeMinuteValue = Number(timeMinute.value);

    if (Number.isNaN(timeMinuteValue)) {
      errorMessage.textContent = 'Time (minute) must be a number!';
      return;
    }

    if (!checkDateInputFormat(dateInput.value)) {
      errorMessage.textContent = 'Date format is not valid!';
      return;
    }

    if (!checkPassword(password.value)) {
      errorMessage.textContent = 'Wrong password!';
      return;
    }

    await addData({
      time: timeMinuteValue,
      date: dateInput.value,
    });

    errorMessage.textContent = '';
    timeMinute.value = '';
    dateInput.value = '';
    password.value = '';
    password.select();
    dateInput.select();
    timeMinute.select();
  } catch (error) {
    const message = 'Something went wrong adding data!';

    console.error(message);
    errorMessage.textContent = message;
    console.error(error);
  }
};

export default formController;
