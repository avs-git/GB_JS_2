// 3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
//     ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий).
// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом
// (+20 рублей, +5 калорий). ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
//     Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.


class Burger {
    constructor() {
        this.sizes = {
            small: {
                name: 'маленький',
                cost: 50,
                calories: 20,
            },
            big: {
                name: 'большой',
                cost: 100,
                calories: 40,
            }
        };

        this.size = this.sizes['small'];

        this.toppings = {
            cheese: {
                name: 'сыр',
                cost: 10,
                calories: 20,
                quantity: 0,
            },
            salad: {
                name: 'салат',
                cost: 20,
                calories: 5,
                quantity: 0,
            },
            potato: {
                name: 'картофель',
                cost: 15,
                calories: 10,
                quantity: 0,
            },
            spices: {
                name: 'приправа',
                cost: 15,
                calories: 0,
                quantity: 0,
            },
            mayonnaise: {
                name: 'майонез',
                cost: 20,
                calories: 5,
                quantity: 0,
            },
        };

        this.sumResult = document.createElement('span');
        this.sumResult.innerText = this.getSum();

        this.caloriesResult = document.createElement('span');
        this.caloriesResult.innerText = this.getCalories();

        this.recipeResult = document.createElement('span');
        this.recipeResult.innerText = this.getRecipeResult();
    }

    setSize(size) {
        this.size = this.sizes[size];
        this.update();
    }

    addToppings(topping) {
        this.toppings[topping].quantity += 1;
        this.update();
    }

    subsetTopping(topping) {
        this.toppings[topping].quantity -= 1;
        if (this.toppings[topping].quantity <= 0) {
            this.toppings[topping].quantity = 0;
        }
        this.update();
    }

    getSum() {
        let sum = 0;
        for (let topping in this.toppings) {
            sum += this.toppings[topping].cost * this.toppings[topping].quantity;
        }
        sum += this.size.cost;
        console.log(sum);
        return sum;
    }

    getRecipeResult() {
        let result = `Размер бургера: ${this.size.name}`;
        for(let item in this.toppings){
            if(this.toppings[item].quantity > 0){
                result += `, ${this.toppings[item].name}: ${this.toppings[item].quantity}`;
            }
        }
        console.log(result);

        return result;
    }

    update() {
        this.sumResult.innerText = this.getSum();
        this.caloriesResult.innerText = this.getCalories();
        this.recipeResult.innerText = this.getRecipeResult();
    }

    getCalories() {
        let sum = 0;
        for (let topping in this.toppings) {
            sum += this.toppings[topping].calories * this.toppings[topping].quantity;
        }
        sum += this.size.calories;

        return sum;
    }

    render() {
        const $container = document.createElement('div');

        const domFactory = (tagName, innerText) => {
            const newElem = document.createElement(tagName);
            if(innerText) newElem.innerText = innerText;

            return newElem;
        };

        $container.appendChild(domFactory('span', 'Выберите размер бургера'));
        $container.appendChild(domFactory('br'));

        for(let sizeItem in this.sizes){
            const burgerButton = document.createElement('button');
            burgerButton.innerText = sizeItem;
            burgerButton.addEventListener('click', () => {
                this.setSize(sizeItem);
            });

            $container.appendChild(burgerButton);
        }

        $container.appendChild(domFactory('br'));

        for (let toppingsItem in this.toppings){
            const $toppingRow = document.createElement('span');

            const $subSetButton = document.createElement('button');
            $subSetButton.innerText = '-';
            $subSetButton.addEventListener('click', () => {
                this.subsetTopping(toppingsItem);
            });

            const $nameSpan = document.createElement('span');
            $nameSpan.innerText = this.toppings[toppingsItem].name;

            const $addButton = document.createElement('button');
            $addButton.innerText = '+';
            $addButton.addEventListener('click', () => {
                this.addToppings(toppingsItem);
            });

            $toppingRow.appendChild($subSetButton);
            $toppingRow.appendChild($nameSpan);
            $toppingRow.appendChild($addButton);

            $container.appendChild($toppingRow);
            $container.appendChild(domFactory('br'));
        }
        $container.appendChild(domFactory('br'));

        $container.appendChild(domFactory('span', 'Стоимость: '));
        $container.appendChild(this.sumResult);
        $container.appendChild(domFactory('br'));

        console.log(this.sumResult);

        $container.appendChild(domFactory('span', 'Калорийность: '));
        $container.appendChild(this.caloriesResult);
        $container.appendChild(domFactory('br'));

        $container.appendChild(this.recipeResult);
        return $container;
    }
}

const burger = new Burger();

document.body.appendChild(burger.render());