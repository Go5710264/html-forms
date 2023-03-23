export class Tooltip {
    constructor() {
        this._tooltips = []; // массив тултипов
    }

    // на вход передавать сообщение об ошибке и элемент на котором возникла ошибка
    // далее добавить экземпляр туллтипа в интерфейс
    // возможность скрыть данный туллтип по id или ключу
    showTooltip(message, element){
        const tooltipElement = document.createElement('div');
        tooltipElement.classList.add('form-error');
        tooltipElement.textContent = message;

        const id = performance.now();

        this._tooltips.push({
            id,
            element: tooltipElement
        });

        document.body.appendChild(tooltipElement); 
        // сообщение об ошибке добавляется под форму

        console.log(element.getBoundingClientRect());
        //  координаты элемента

        const { right, top } = element.getBoundingClientRect();
        let { left, top: topTooltip } = tooltipElement.getBoundingClientRect();

        // // использование поля style инлайнового элемента для того чтобы повлиять на инлайновые стили туллтипа
        // left = right + 5 + 'px';
        // // левый край туллтипа примыкал к правому краю элемента
        // topTooltip = top + 'px';
        // console.log(tooltipElement.getBoundingClientRect())

        // использование поля style инлайнового элемента для того чтобы повлиять на инлайновые стили туллтипа
        tooltipElement.style.left = right + 5 + 'px';
        // левый край туллтипа примыкал к правому краю элемента
        tooltipElement.style.top = top + 'px';
        // console.log(tooltipElement.style.top)
        // console.log(element)

        return id;
    }

    removeTooltip(id){
        const tooltip = this._tooltips.find(t => t.id === id)

        tooltip.element.remove();

        this._tooltips = this._tooltips.filter(t => t.id !== id); // чистка массива
    }

    // Перемещение туллтипа к тому элементу к которому оно относится:
    // необоходимы координаты элемента (того который передается в showTooltip)
    // далее эти координаты используются для абсолютного позиционирования тоолтипа относительно страницы
}