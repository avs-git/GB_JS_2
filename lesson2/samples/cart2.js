class Cart {
    constructor(rootElement) {
        this.goodsList = [];
        this.rootElement = rootElement;
        this.rendered = false;
        this.$cartTable = document.createElement('table');
        this.$cartTableBody = document.createElement('tbody');

        this.$cartTableCommonQuantity = document.createElement('td');
        this.$cartTableCommonQuantity.innerText = this.getQuantity();

        this.$cartTableSum = document.createElement('td');
        this.$cartTableSum.innerText = this.getSum();

        this.$dummy = document.createElement('tr');
        this.$dummy.innerHTML = '<td colspan = 5>Корзина пуста</td>';
        this.$cartTableBody.appendChild(this.$dummy);
    }

    // Добавляет товар в коризну
    addToCart(good, changeQuantity = 1) {
        if (!good) {
            return;
        }
        if (this.goodsList.includes(good)) {
            this.goodsList[this.goodsList.indexOf(good)].changeQuantity(changeQuantity);
            this.updateSummary();
            return;
        }

        this.goodsList.push(good);
        this.checkCartIsEmpty();
        good.changeQuantity(changeQuantity);
        this.updateSummary();
        this.$cartTableBody.appendChild(good.render());

    }

    checkCartIsEmpty() {
        if (this.goodsList.length > 0 && this.$cartTableBody.contains(this.$dummy)) {
            this.$cartTableBody.removeChild(this.$dummy);
        }
        if (this.goodsList.length === 0 && !this.$cartTableBody.contains(this.$dummy)) {
            this.$cartTableBody.appendChild(this.$dummy);
        }
    }

    updateSummary() {
        this.$cartTableCommonQuantity.innerText = this.getQuantity();
        this.$cartTableSum.innerText = this.getSum();
    }


    // Удаление товара из коризны
    removeFromCart(good) {
        if (this.goodsList.includes(good)) {
            this.goodsList.splice(this.goodsList.indexOf(good), 1);
            good.removeFromCart();
            this.updateSummary();
        }
        this.checkCartIsEmpty();
    }

    // Возвращает массив товаров в корзине [{ товар: id, количество: }]
    getCart = () => this.goodsList;

    // возвращает сумму товаров в корзине
    getSum() {
        let sum = 0;

        this.goodsList.forEach(({price, quantity}) => {
            sum += price * quantity;
        });

        return sum;
    }

    // возвращает количество товаров в корзине
    getQuantity() {
        let goodsQuantity = 0;

        this.goodsList.forEach(({quantity}) => {
            goodsQuantity += quantity;
        });

        return goodsQuantity;
    }

    // очистить корзину
    drop() {
        this.goodsList.forEach(item => {
            item.removeFromCart()
        });
        this.goodsList = [];
        this.checkCartIsEmpty();
        this.updateSummary();
    }

    render() {
        const $cartHeader = document.createElement('thead');
        $cartHeader.innerHTML = '<td>ID</td><td>Название</td><td>Цена</td><td>Количество</td><td>Сумма</td>';
        this.$cartTable.appendChild($cartHeader);

        this.$cartTable.appendChild(this.$cartTableBody);


        this.goodsList.forEach($item => this.$cartTableBody.appendChild($item.render()));
        const $summaryRow = document.createElement('tr');

        const $firstCellSummary = document.createElement('td');
        $firstCellSummary.colSpan = 3;
        $firstCellSummary.innerText = 'Итого';
        $firstCellSummary.style.textAlign = 'right';
        $summaryRow.appendChild($firstCellSummary);
        $summaryRow.appendChild(this.$cartTableCommonQuantity);
        $summaryRow.appendChild(this.$cartTableSum);

        this.$cartTable.appendChild($summaryRow);


        this.rootElement.appendChild(this.$cartTable);
    }
}

class CartItem {
    constructor(id, name, price, cart, quantity = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.cart = cart;

        this.$itemRow = document.createElement('tr');

        this.$id = document.createElement('td');
        this.$id.innerHTML = this.id;

        this.$name = document.createElement('td');
        this.$name.innerText = this.name;

        this.$price = document.createElement('td');
        this.$price.innerText = this.price;

        this.$quantity = document.createElement('td');
        this.$quantity.innerText = this.quantity;

        this.$sum = document.createElement('td');
        this.$sum.innerText = this.getSum();

        this.$removeButton = document.createElement('button');
        this.$removeButton.innerText = 'remove';
        this.$removeButton.addEventListener('click', () => {
            this.cart.removeFromCart(this);
        });
    }

    // изменить цену товара
    setPrice(newPrice) {
        this.price = newPrice;

        this.$price = this.price;
    }

    // Изменить количество товара
    changeQuantity(offset) {
        this.quantity += offset;

        if (this.quantity <= 0) {
            this.quantity = 0;
        }

        this.$quantity.innerText = this.quantity;
        this.updateSum();
    }

    // получить сумму позиции (количество * цена)
    getSum = () => this.quantity * this.price;

    updateSum() {
        this.$sum.innerText = this.getSum();
    }

    removeFromCart() {
        this.quantity = 0;
        this.$itemRow.remove();
    }

    render() {
        this.$itemRow.appendChild(this.$id);
        this.$itemRow.appendChild(this.$name);
        this.$itemRow.appendChild(this.$price);
        this.$itemRow.appendChild(this.$quantity);
        this.$itemRow.appendChild(this.$sum);
        this.$itemRow.appendChild(this.$removeButton);
        return this.$itemRow;
    }
}

const $cartContainer = document.createElement('div');
document.body.appendChild($cartContainer);

const cart = new Cart($cartContainer);
cart.render();