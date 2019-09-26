class Cart {
    constructor(rootElement) {
        this.goodsList = [];
        this.rootElement = rootElement;
        this.rendered = false;
        this.$cartTable = document.createElement('table');
    }

    // Добавляет товар в коризну
    addToCart(good, changeQuantity = 1) {
        if(!good) {
            return;
        }
        if(this.goodsList.includes(good)){
            this.goodsList[this.goodsList.indexOf(good)].changeQuantity(changeQuantity);
            return;
        }
        good.setQuantity(changeQuantity);
        this.goodsList.push(good);
    }

    // Удаление товара из коризны, good = { товар, количество = 1}
    removeFromCart(good) {
        if(this.goodsList.includes(good)){
            this.goodsList.splice(this.goodsList.indexOf(good), 1);
        }
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

        this.goodsList.forEach(({ quantity }) => {
            goodsQuantity += quantity;
        });

        return goodsQuantity;
    }

    // очистить корзину
    drop() {
        this.goodsList = [];
        this.render();
    }

    render() {
        if(this.rendered){
            this.$cartTable.innerHTML = '';
        }

        this.rendered = true;

        const $cartHeader = document.createElement('thead');
        this.$cartTable.appendChild($cartHeader);
        $cartHeader.innerHTML = '<td>ID</td><td>Название</td><td>Цена</td><td>Количество</td><td>Сумма</td>';

        if(this.goodsList.length === 0){
            const $dummy = document.createElement('tr');
            $dummy.innerHTML = '<td colspan = 5>Корзина пуста</td>';
            this.$cartTable.appendChild($dummy);
        } else {
            this.goodsList.forEach($item => this.$cartTable.appendChild($item.render()));
            const $summary = document.createElement('tr');
            $summary.innerHTML = `<td colspan="3">Итого</td><td>${this.getQuantity()}</td><td>${this.getSum()}</td>`;
            this.$cartTable.appendChild($summary);
        }

        this.rootElement.appendChild(this.$cartTable);
    }
}

class CartItem {
    constructor(id, name, price, quantity = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;

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
    }

    // изменить цену товара
    setPrice(newPrice) {
        this.price = newPrice;

        this.$price = this.price;
    }

    // Изменить количество товара
    changeQuantity(offset) {
        this.quantity += offset;

        if(this.quantity <= 0){
            this.quantity = 0;
        }

        this.$quantity.innerText = this.quantity;
        this.updateSum();
    }

    // установить количество товара
    setQuantity(newQuantity){
        if(newQuantity <= 0) {
            newQuantity = 0;
        }

        this.quantity = newQuantity;
        this.$quantity.innerText = this.quantity;
        this.updateSum();
    }

    // получить сумму позиции (количество * цена)
    getSum = () => this.quantity * this.price;

    updateSum() {
        this.$sum.innerText = this.getSum();
    }

    render() {
        const $itemRow = document.createElement('tr');
        $itemRow.appendChild(this.$id);
        $itemRow.appendChild(this.$name);
        $itemRow.appendChild(this.$price);
        $itemRow.appendChild(this.$quantity);
        $itemRow.appendChild(this.$sum);

        return $itemRow;
    }
}

const $cartContainer = document.createElement('div');
document.body.appendChild($cartContainer);

const cart = new Cart($cartContainer);

const good1 = new CartItem(1, 'носки', 50)
const good2 = new CartItem(2, 'майка', 50)
const good3 = new CartItem(3, 'рубашка', 50)
const good4 = new CartItem(4, 'брюки', 50)


cart.addToCart(good3, 20);
cart.addToCart(good2, 20);
cart.addToCart(good1, 20);
cart.addToCart(good4, 20);

cart.render();

cart.removeFromCart(good3);





const manageCart = document.createElement('div');
const dropCartButton = document.createElement('button');
dropCartButton.innerHTML = 'Drop cart';
dropCartButton.addEventListener('click', () => {
    cart.drop();
});

const addToCartButton = document.createElement('button');
addToCartButton.innerHTML = 'add good3  +2 pcs';
addToCartButton.addEventListener('click', () => {
    cart.addToCart(good3, 2);
});

manageCart.appendChild(dropCartButton);
manageCart.appendChild(addToCartButton);

document.body.appendChild(manageCart);