// TODO: write your code here
import sum from './basic';
import { Tooltip } from './tooltip';

document.addEventListener('DOMContentLoaded', () => {
/*
весь код приложения внутри обработчика
данного события начнет работать после загрузки DOM
*/

  console.log('worked');
  console.log(sum([1, 2]));

  const form = document.querySelector('.form');

  const errors = {
    login: {
      valueMissing: 'Представьтесь, пожалуйста!'
    },
    email: {
      valueMissing: 'Нам потребуется ваш email',
      typeMismatch: 'Уточните свою почту'
    },
    'credit-card': {
      valueMissing: 'Необходимо предоставить данные карты',
      patternMismatch: 'Не удалось снять деньги с вашей карты'
    }
  }

  const tooltipFactory = new Tooltip();

  let actualMessages = [];
  // активные туллтипы

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    actualMessages.forEach((id) => tooltipFactory.removeTooltip(id))
    // убрать все активные сообщения из верстки

    actualMessages = [];
    // удалить сообщения из массива

    if(form.checkValidity()){
      console.log('valid')
    } else {
      console.log('invalid')
    }

    const elements = form.elements;

    [...elements].some((el) => { // выполняет коллбек до первого true

      return Object.keys(ValidityState.prototype).some((key) => {
      // выполняет коллбек до первого true
        if(!el.name) return; // если у элемента формы нет имени
        if(key === 'valid') return;
        // if(key === 'customError') return;

        if(el.validity[key]){
          console.log(key);
          console.log(errors[el.name][key])
        
          actualMessages.push(tooltipFactory.showTooltip(errors[el.name][key], el));
          // добавление id туллтипа в массив активных туллтипов

          return true;
        }
      })
    });
  })
});
