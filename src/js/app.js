// TODO: write your code here
import Tooltip from './tooltip';

document.addEventListener('DOMContentLoaded', () => {
/*
весь код приложения внутри обработчика
данного события начнет работать после загрузки DOM
*/

  const form = document.querySelector('.form');

  const json = localStorage.getItem('formData'); // считывание данных из localStorage

  // распарсинг данных

  let formData;

  try {
    formData = JSON.parse(json);
  } catch (error) {
    console.log(error);
  }

  if (formData) {
    Object.keys(formData).forEach((key) => {
      form.querySelector(`[name="${key}"]`).value = formData[key];
    });
  }

  const { elements } = form;

  const errors = {
    login: {
      valueMissing: 'Представьтесь, пожалуйста!',
    },
    email: {
      valueMissing: 'Нам потребуется ваш email',
      typeMismatch: 'Уточните свою почту',
    },
    'credit-card': {
      valueMissing: 'Необходимо предоставить данные карты',
      patternMismatch: 'Не удалось снять деньги с вашей карты',
    },
  };

  const tooltipFactory = new Tooltip();

  let actualMessages = [];
  // активные туллтипы

  const showTooltip = (message, el) => {
    actualMessages.push({
      name: el.name,
      id: tooltipFactory.showTooltip(message, el),
    });
    // добавление id туллтипа в массив активных туллтипов
  };

  function getError(el) { // валидация в отдельной функции
    // выполняет коллбек до первого true
    const errorKey = Object.keys(ValidityState.prototype).find((key) => {
    // выполняет коллбек до первого true
      if (!el.name) return false; // если у элемента формы нет имени
      if (key === 'valid') return false;

      return el.validity[key];
    });

    if (!errorKey) return false;

    return errors[el.name][errorKey];
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    actualMessages.forEach((message) => tooltipFactory.removeTooltip(message.id));
    // убрать все активные сообщения из верстки

    actualMessages = [];
    // удалить сообщения из массива

    if (form.checkValidity()) {
      console.log('valid');
    } else {
      console.log('invalid');
    }

    [...elements].some((elem) => {
      const error = getError(elem);

      if (error) {
        showTooltip(error, elem);
        return true;
      }

      return false;
    });
  });

  const elementOnBlur = (e) => {
    // проверка валидности элемента
    const el = e.target;

    const error = getError(el);

    if (error) {
      showTooltip(error, el);
    } else {
      // убрать предыдущий тултип
      const currentErrorMessage = actualMessages.find((item) => {
        if (!item) {
          return false;
        } if (item.name === el.name) {
          return true;
        }
        return false;
      });
      // Необохидимо доработать: правильной ввод емэйла таб =>
      // неправильной ввод емэйла таб => удаление мыла => повторный ввод

      actualMessages.forEach((item, index) => {
        if (currentErrorMessage === item) {
          delete actualMessages[index];
        }
      });
      // поиск id актуальной ошибки

      if (currentErrorMessage) {
        tooltipFactory.removeTooltip(currentErrorMessage.id);
      }
    }

    el.removeEventListener('blur', elementOnBlur); // отписывание от события блюр
  };

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].addEventListener('focus', () => {
      // валидация поля будет происзодить в момент исчезновения фокуса
      [...elements][i].addEventListener('blur', elementOnBlur);
    });
  }

  // работа с LocalStorage
  window.addEventListener('beforeunload', () => {
    const inputData = {}; // объект для хранения данных

    Array.from(elements).forEach((el) => {
      if (!el.name) return; // отсеить кнопки из элементов

      inputData[el.name] = el.value; // запись данных в объект
    });

    localStorage.setItem('formData', JSON.stringify(inputData)); // запись данных в localStorage
  });
});
