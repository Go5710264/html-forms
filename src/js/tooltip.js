export default class Tooltip {
  constructor() {
    this._tooltips = []; // массив тултипов
  }

  showTooltip(message, element) {
    const dubleError = this._tooltips.find((error) => error.element.textContent === message);
    // если данная ошибка уже есть, то выйти из функции
    if (dubleError) return false;

    const tooltipElement = document.createElement('div');
    // инициализация туллтип-элемента
    tooltipElement.classList.add('form-error');
    // добавление элементу класса
    tooltipElement.textContent = message;
    // добавление текста элементу

    const id = performance.now();

    this._tooltips.push({
      // добавление созданного туллтипа в общий массив
      id,
      element: tooltipElement,
    });

    document.body.appendChild(tooltipElement);
    // туллтип добавляется под форму

    // console.log(element.getBoundingClientRect());
    //  координаты элемента

    this.getCoords(element);
    // определение координатов элемента относительно страницы

    // использование поля style инлайнового элемента для того чтобы
    // повлиять на инлайновые стили туллтипа
    tooltipElement.style.left = `${this.coords.right + 5}px`;
    // левый край туллтипа примыкал к правому краю элемента
    // центр туллтипа совпадает с центром поля ввода:
    tooltipElement.style.top = `${this.coords.top + element.offsetHeight / 2 - tooltipElement.offsetHeight / 2}px`;
    /*     верхний край на том же расстоянии, что и поле.
    Верхний край туллтипа сместить на половину ПОЛЯ ВВОДА вниз,
    а потом поднять туллтип на половину СЕБЯ вверх */

    return id;
  }

  removeTooltip(id) {
    const tooltip = this._tooltips.find((t) => t.id === id);

    tooltip.element.remove();

    this._tooltips = this._tooltips.filter((t) => t.id !== id); // чистка массива
  }

  getCoords(elem) { // получение координат поля ввода относительно начала страницы
    const box = elem.getBoundingClientRect();

    this.coords = {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
    };
  }
}
