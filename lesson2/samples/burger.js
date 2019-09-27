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

        this.size = {};

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
    }

    setSize(size) {
        this.size = this.sizes[size];
        this.updateSum();
    }

    addToppings(topping) {
        this.toppings[topping].quantity += 1;
        this.updateSum();
        console.log(this.toppings[topping].quantity);
    }

    subsetTopping(topping) {
        this.toppings[topping].quantity -= 1;
        if (this.toppings[topping].quantity <= 0) {
            this.toppings[topping].quantity = 0;
        }
        this.updateSum();
        console.log(this.toppings[topping].quantity);
    }

    getSum() {
        let sum = 0;
        for (let topping in this.toppings) {
            sum += this.toppings[topping].cost * this.toppings[topping].quantity;
        }
        sum += this.size.cost;

        return sum;
    }

    updateSum() {
        this.sumResult.innerText = this.getSum();
        this.caloriesResult.innerText = this.getCalories();
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
        const renderedTree = [];
        const $container = document.createElement('div');
        $container.innerHTML += '<span>выберите размер</span><br/>';
        for (let sizeItem in this.sizes){

            renderedTree[sizeItem] = {};

            renderedTree[sizeItem].element = document.createElement('button');
            renderedTree[sizeItem].element.innerText = this.sizes[sizeItem].name;

            $container.appendChild(renderedTree[sizeItem].element);
            renderedTree[sizeItem].element.addEventListener('click', () => {
                this.setSize(sizeItem);
            });
            console.log(renderedTree[sizeItem].element);
        }
        $container.innerHTML += '<br/><span>выберите начинку</span><br/>';
        for (let toppingsItem in this.toppings){
            renderedTree[toppingsItem] = document.createElement('span');

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

            renderedTree[toppingsItem].appendChild($subSetButton);
            renderedTree[toppingsItem].appendChild($nameSpan);
            renderedTree[toppingsItem].appendChild($addButton);


            $container.appendChild(renderedTree[toppingsItem]);
            $container.innerHTML += '<br/>';
        }

        $container.innerHTML += '<span>Общая стоимость: </span>';
        $container.appendChild(this.sumResult);
        $container.innerHTML += '<br/><span>Общая калорийность: </span>';
        $container.appendChild(this.caloriesResult);

        return $container;
    }
}

const burger = new Burger();


burger.setSize('small');
burger.addToppings('potato');
burger.addToppings('spices');
burger.addToppings('mayonnaise');
burger.subsetTopping('mayonnaise');

console.log(burger.getCalories());
console.log(burger.getSum());

document.body.appendChild(burger.render());