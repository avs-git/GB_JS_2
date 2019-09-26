class Cart {
    constructor(rootElement) {
        this.goodsList = [];
        this.rootElement = rootElement;
        this.rendered = false;
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
    }

    render(rootElem) {
        const $cartTable = document.createElement('table');
        const $cartHeader = document.createElement('thead');
        $cartTable.appendChild($cartHeader);
        $cartHeader.innerHTML = '<td>ID</td><td>Название</td><td>Цена</td><td>Количество</td><td>Сумма</td>';

        if(this.goodsList.length === 0){
            const $dummy = document.createElement('tr');
            $dummy.innerHTML = '<td colspan = 5>Корзина пуста</td>';
            $cartTable.appendChild($dummy);
        } else {
            this.goodsList.forEach($item => $cartTable.appendChild($item.render()));
            const $summary = document.createElement('tr');
            $summary.innerHTML = `<td colspan="3">Итого</td><td>${this.getQuantity()}</td><td>${this.getSum()}</td>`;
            $cartTable.appendChild($summary);
        }

        this.rootElement.appendChild($cartTable);
    }
}

class CartItem {
    constructor(id, name, price, quantity = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // изменить цену товара
    setPrice(newPrice) {
        this.price = newPrice;
    }

    // Изменить количество товара
    changeQuantity(offset) {
        this.quantity += offset;

        if(this.quantity <= 0){
            this.quantity = 0;
        }
    }

    // установить количество товара
    setQuantity(newQuantity){
        if(newQuantity <= 0) {
            newQuantity = 0;
        }

        this.quantity = newQuantity;
    }

    // получить сумму позиции (количество * цена)
    getSum = () => this.quantity * this.price;

    render() {
        const $itemRow = document.createElement('tr');
        $itemRow.innerHTML = `<td>${this.id}</td><td>${this.name}</td>`+
            `<td>${this.price}</td><td>${this.quantity}</td><td>${this.getSum()}</td>`;

        return $itemRow;
    }
}

const cart = new Cart(document.body);

const good1 = new CartItem(1, 'носки', 50)
const good2 = new CartItem(2, 'майка', 50)
const good3 = new CartItem(3, 'рубашка', 50)
const good4 = new CartItem(4, 'брюки', 50)


cart.addToCart(good3, 20);
cart.addToCart(good2, 20);
cart.addToCart(good3, 20);
cart.addToCart(good1, 20);
cart.addToCart(good4, 20);
cart.addToCart(good2);
cart.addToCart(good3, -1);

cart.removeFromCart(good3);

console.log(cart.getCart());
cart.render();

const manageCart = document.createElement('div');
const dropCartButton = document.createElement('button');
dropCartButton.innerHTML = 'Drop cart';
dropCartButton.addEventListener('click', () => {
    cart.drop();
});

manageCart.appendChild(dropCartButton);

document.body.appendChild(manageCart);